"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDashboard } from "@/context/DashboardContext";
import { apiFetch, uploadImage } from "@/lib/api";
import { categories, conditions, rentalTypes } from "@/lib/constants";

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default function AddEquipmentPage() {
  const { role, user } = useDashboard();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (role !== "owner") {
    return (
      <p className="text-sm text-muted-foreground">
        Only owners can add equipment.
      </p>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const file = form.elements.image.files[0];

    if (!file) {
      toast.error("Please choose an equipment image.");
      return;
    }

    try {
      setLoading(true);
      data.image = await uploadImage(file);
      await apiFetch("/equipment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Equipment added. It is pending admin approval.");
      router.push("/dashboard/my-equipment");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Add Equipment</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        New listings start as pending until an admin approves them.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Equipment name">
          <Input name="name" required placeholder="Canon EOS R5" />
        </Field>

        <Field label="Category">
          <select
            name="category"
            required
            className={selectClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Location">
          <Input name="location" required placeholder="Dhaka" />
        </Field>

        <Field label="Rental price (BDT)">
          <Input name="price" type="number" min="1" required />
        </Field>

        <Field label="Rental type">
          <select
            name="rentalType"
            required
            className={selectClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select rental type
            </option>
            {rentalTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Available quantity">
          <Input name="quantity" type="number" min="1" required />
        </Field>

        <Field label="Condition">
          <select
            name="condition"
            required
            className={selectClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select condition
            </option>
            {conditions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Brand">
          <Input name="brand" required />
        </Field>

        <Field label="Model">
          <Input name="model" required />
        </Field>

        <Field label="Equipment image">
          <Input name="image" type="file" accept="image/*" required />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Description">
            <Textarea name="description" required rows={4} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Rental terms and conditions">
            <Textarea name="terms" required rows={3} />
          </Field>
        </div>

        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
          <Field label="Owner name">
            <Input value={user.name} readOnly />
          </Field>
          <Field label="Owner email">
            <Input value={user.email} readOnly />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white"
          >
            {loading ? "Saving..." : "Add equipment"}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditEquipmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { role } = useDashboard();
  const [item, setItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch(`/equipment/${id}`)
      .then(setItem)
      .catch((error) => toast.error(error.message));
  }, [id]);

  if (role !== "owner" && role !== "admin") {
    return (
      <p className="text-sm text-muted-foreground">
        You cannot edit equipment.
      </p>
    );
  }

  if (!item) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const file = form.elements.image.files[0];

    try {
      setSaving(true);
      // keep the old image unless a new file was chosen
      data.image = file ? await uploadImage(file) : item.image;
      await apiFetch(`/equipment/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      toast.success("Equipment updated");
      router.push(
        role === "admin"
          ? "/dashboard/all-equipment"
          : "/dashboard/my-equipment",
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Update Equipment</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Equipment name">
          <Input name="name" required defaultValue={item.name} />
        </Field>

        <Field label="Category">
          <select
            name="category"
            required
            className={selectClass}
            defaultValue={item.category}
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Location">
          <Input name="location" required defaultValue={item.location} />
        </Field>

        <Field label="Rental price (BDT)">
          <Input
            name="price"
            type="number"
            min="1"
            required
            defaultValue={item.price}
          />
        </Field>

        <Field label="Rental type">
          <select
            name="rentalType"
            required
            className={selectClass}
            defaultValue={item.rentalType}
          >
            {rentalTypes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Available quantity">
          <Input
            name="quantity"
            type="number"
            min="0"
            required
            defaultValue={item.quantity}
          />
        </Field>

        <Field label="Condition">
          <select
            name="condition"
            required
            className={selectClass}
            defaultValue={item.condition}
          >
            {conditions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Brand">
          <Input name="brand" required defaultValue={item.brand} />
        </Field>

        <Field label="Model">
          <Input name="model" required defaultValue={item.model} />
        </Field>

        <Field label="New image (optional)">
          <Input name="image" type="file" accept="image/*" />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Description">
            <Textarea
              name="description"
              required
              rows={4}
              defaultValue={item.description}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Rental terms and conditions">
            <Textarea
              name="terms"
              required
              rows={3}
              defaultValue={item.terms}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={saving}
            className="h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

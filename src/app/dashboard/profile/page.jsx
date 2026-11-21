"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboard } from "@/context/DashboardContext";
import { authClient } from "@/lib/auth-client";
import { apiFetch, uploadImage } from "@/lib/api";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const { role } = useDashboard();
  const { refetch } = authClient.useSession();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/users/me")
      .then(setProfile)
      .catch((error) => toast.error(error.message));
  }, []);

  if (!profile) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const file = form.elements.photo.files[0];

    try {
      setSaving(true);
      const image = file ? await uploadImage(file) : data.image;
      const updated = {
        name: data.name,
        image,
        phone: data.phone,
        address: data.address,
      };
      await apiFetch("/users/profile", {
        method: "PATCH",
        body: JSON.stringify(updated),
      });
      setProfile((current) => ({ ...current, ...updated }));
      refetch?.();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="mt-6 flex items-center gap-4">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.name}
            className="size-20 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-bold">
            {profile.name?.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-muted-foreground capitalize">{role}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required defaultValue={profile.name} />
        </Field>

        <Field label="Email">
          <Input value={profile.email} readOnly />
        </Field>

        <Field label="Phone number">
          <Input name="phone" type="tel" defaultValue={profile.phone || ""} />
        </Field>

        <Field label="Address">
          <Input name="address" defaultValue={profile.address || ""} />
        </Field>

        <Field label="Photo URL">
          <Input name="image" type="url" defaultValue={profile.image || ""} />
        </Field>

        <Field label="Or upload a new photo">
          <Input name="photo" type="file" accept="image/*" />
        </Field>

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={saving}
            className="h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white"
          >
            {saving ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { useRole } from "@/hooks/useRole";

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

export default function EquipmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { session, isPending, role } = useRole();
  const [item, setItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/sign-in");
      return;
    }
    apiFetch(`/equipment/${id}`)
      .then(setItem)
      .catch((err) => setError(err.message));
    apiFetch(`/favorites/${id}`)
      .then((data) => setIsFavorite(data.isFavorite))
      .catch(() => {});
  }, [id, session, isPending, router]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await apiFetch(`/favorites/${id}`, { method: "DELETE" });
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await apiFetch("/favorites", {
          method: "POST",
          body: JSON.stringify({ equipmentId: id }),
        });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (error) {
    return <p className="p-10 text-center text-sm text-red-500">{error}</p>;
  }

  if (isPending || !item) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="size-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  const available = item.quantity > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-2xl bg-muted lg:h-[26rem]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
            {item.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{item.name}</h1>
          <p className="mt-3 text-2xl font-bold">
            ৳{item.price}{" "}
            <span className="text-base font-normal text-muted-foreground">
              / {item.rentalType}
            </span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {item.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border/60 p-4">
            <Info label="Location" value={item.location} />
            <Info label="Rental type" value={item.rentalType} />
            <Info label="Available quantity" value={item.quantity} />
            <Info
              label="Availability"
              value={available ? "Available" : "Unavailable"}
            />
            <Info label="Condition" value={item.condition} />
            <Info
              label="Brand / Model"
              value={`${item.brand} / ${item.model}`}
            />
          </div>

          <div className="mt-4 rounded-xl border border-border/60 p-4">
            <p className="text-xs text-muted-foreground">Owner</p>
            <p className="text-sm font-medium">{item.ownerName}</p>
            <p className="text-sm text-muted-foreground">{item.ownerEmail}</p>
          </div>

          {role === "customer" && (
            <div className="mt-6 flex flex-wrap gap-3">
              {/* the Book Now button is added in the booking step */}
              <Button variant="outline" onClick={toggleFavorite}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border/60 p-5">
        <h2 className="text-lg font-semibold">Rental terms and conditions</h2>
        <p className="mt-2 text-sm whitespace-pre-line text-muted-foreground">
          {item.terms}
        </p>
      </div>
    </div>
  );
}

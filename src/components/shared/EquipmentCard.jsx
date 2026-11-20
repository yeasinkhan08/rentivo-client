"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function EquipmentCard({ item }) {
  const { data: session } = authClient.useSession();
  const available = item.quantity > 0;
  const href = session ? `/equipment/${item._id}` : "/sign-in";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:shadow-lg">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-medium text-white",
            available ? "bg-emerald-600" : "bg-red-600",
          )}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium text-sky-600 dark:text-sky-300">
          {item.category}
        </p>
        <h3 className="line-clamp-1 text-lg font-semibold">{item.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {item.location}
        </p>
        <p className="mt-auto pt-2 text-lg font-bold">
          ৳{item.price}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / {item.rentalType}
          </span>
        </p>
        <Link
          href={href}
          className={cn(
            buttonVariants(),
            "mt-2 h-10 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-sm font-semibold text-white hover:from-sky-400 hover:to-blue-500",
          )}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

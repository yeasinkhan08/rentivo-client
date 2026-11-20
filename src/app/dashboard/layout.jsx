"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { DashboardContext } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";

const menus = {
  customer: [
    { label: "My Rentals", href: "/dashboard/my-rentals" },
    { label: "Favorites", href: "/dashboard/favorites" },
    { label: "Profile", href: "/dashboard/profile" },
  ],
  owner: [
    { label: "Add Equipment", href: "/dashboard/add-equipment" },
    { label: "My Equipment", href: "/dashboard/my-equipment" },
    { label: "My Equipment Rental", href: "/dashboard/my-equipment-rental" },
    { label: "My Profile", href: "/dashboard/profile" },
  ],
  admin: [
    { label: "All Users", href: "/dashboard/all-users" },
    { label: "All Equipment", href: "/dashboard/all-equipment" },
    { label: "All Rentals", href: "/dashboard/all-rentals" },
    { label: "My Profile", href: "/dashboard/profile" },
  ],
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return; // wait until the session is known

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    apiFetch(`/users/role/${session.user.email}`)
      .then((data) => setRole(data.role))
      .catch((err) => setError(err.message));
  }, [session, isPending, router]);

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center p-6 text-center text-sm text-red-500">
        Could not load your dashboard: {error}
      </main>
    );
  }

  if (isPending || !session || !role) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="size-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </main>
    );
  }

  const links = menus[role] || menus.customer;

  return (
    <DashboardContext.Provider value={{ user: session.user, role }}>
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar (becomes a scrollable row on mobile) */}
        <aside className="border-b border-border/60 bg-card/50 lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
          <div className="hidden p-5 lg:block">
            <p className="truncate text-sm font-semibold">
              {session.user.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>

          <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:p-3">
            <Link
              href="/dashboard"
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
                pathname === "/dashboard" &&
                  "bg-sky-500/10 text-sky-600 dark:text-sky-300",
              )}
            >
              Overview
            </Link>
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
                  pathname === item.href &&
                    "bg-sky-500/10 text-sky-600 dark:text-sky-300",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Full-width content */}
        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </div>
    </DashboardContext.Provider>
  );
}

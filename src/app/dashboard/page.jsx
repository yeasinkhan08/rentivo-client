"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function DashboardHome() {
  const { user, role } = useDashboard();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground capitalize">
        Signed in as {role}. Analytics charts will appear here.
      </p>
    </div>
  );
}

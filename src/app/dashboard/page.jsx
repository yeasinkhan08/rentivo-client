"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import StatCard from "@/components/dashboard/StatCard";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import { useDashboard } from "@/context/DashboardContext";
import { apiFetch } from "@/lib/api";

export default function DashboardHome() {
  const { user, role } = useDashboard();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let path = "/bookings/my"; // customer
    if (role === "admin") path = "/analytics/admin";
    if (role === "owner") path = "/analytics/owner";

    apiFetch(path)
      .then(setStats)
      .catch((error) => toast.error(error.message));
  }, [role]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground capitalize">
        {role} dashboard
      </p>

      {!stats ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading...</p>
      ) : role === "admin" ? (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Total users" value={stats.totalUsers} />
            <StatCard title="Total equipment" value={stats.totalEquipment} />
            <StatCard title="Total bookings" value={stats.totalBookings} />
            <StatCard
              title="Pending approvals"
              value={stats.pendingApprovals}
            />
            <StatCard
              title="Completed rentals"
              value={stats.completedRentals}
            />
            <StatCard title="Total revenue" value={`৳${stats.totalRevenue}`} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <MonthlyChart
              title="Monthly bookings"
              data={stats.monthly}
              dataKey="bookings"
              label="Bookings"
              color="#0ea5e9"
            />
            <MonthlyChart
              title="Monthly revenue (৳)"
              data={stats.monthly}
              dataKey="revenue"
              label="Revenue"
              color="#2563eb"
            />
          </div>
        </div>
      ) : role === "owner" ? (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Listed equipment" value={stats.totalEquipment} />
            <StatCard title="Total bookings" value={stats.totalBookings} />
            <StatCard
              title="Completed rentals"
              value={stats.completedRentals}
            />
            <StatCard
              title="Total earnings"
              value={`৳${stats.totalEarnings}`}
            />
          </div>

          <MonthlyChart
            title="Monthly earnings (৳)"
            data={stats.monthly}
            dataKey="earnings"
            label="Earnings"
            color="#0ea5e9"
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard title="My rentals" value={stats.length} />
          <StatCard
            title="Active or upcoming"
            value={
              stats.filter((item) => item.bookingStatus === "confirmed").length
            }
          />
          <StatCard
            title="Total spent"
            value={`৳${stats.reduce((sum, item) => sum + item.totalAmount, 0)}`}
          />
        </div>
      )}
    </div>
  );
}

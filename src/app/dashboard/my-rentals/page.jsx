"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useDashboard } from "@/context/DashboardContext";
import { apiFetch } from "@/lib/api";

export default function MyRentalsPage() {
  const { role } = useDashboard();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "customer") return;
    apiFetch("/bookings/my")
      .then(setRentals)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [role]);

  if (role !== "customer") {
    return (
      <p className="text-sm text-muted-foreground">
        Only customers have rentals.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Rentals</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : rentals.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          You have no rentals yet.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>End date</TableHead>
                <TableHead>Booking date</TableHead>
                <TableHead>Total amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Booking status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item.equipmentName}
                  </TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>৳{item.totalAmount}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.bookingStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

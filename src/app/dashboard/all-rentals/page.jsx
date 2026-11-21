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

export default function AllRentalsPage() {
  const { role } = useDashboard();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") return;
    apiFetch("/admin/bookings")
      .then(setRentals)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [role]);

  if (role !== "admin") {
    return (
      <p className="text-sm text-muted-foreground">
        Only admins can see this page.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">All Rentals</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : rentals.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No rentals yet.</p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Rental duration</TableHead>
                <TableHead>Booking amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Booking status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <p className="font-medium">{item.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.customerEmail}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{item.ownerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.ownerEmail}
                    </p>
                  </TableCell>
                  <TableCell>{item.equipmentName}</TableCell>
                  <TableCell>
                    {item.startDate} to {item.endDate}
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

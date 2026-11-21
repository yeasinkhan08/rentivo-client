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

export default function MyEquipmentRentalPage() {
  const { role } = useDashboard();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "owner") return;
    apiFetch("/bookings/owner")
      .then(setRentals)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [role]);

  if (role !== "owner") {
    return (
      <p className="text-sm text-muted-foreground">
        Only owners can see this page.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Equipment Rental</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : rentals.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Nobody has rented your equipment yet.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Rental duration</TableHead>
                <TableHead>Quantity</TableHead>
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
                    <p className="text-xs text-muted-foreground">
                      {item.contact}
                    </p>
                  </TableCell>
                  <TableCell>{item.equipmentName}</TableCell>
                  <TableCell>
                    {item.startDate} to {item.endDate}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
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

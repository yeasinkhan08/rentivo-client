"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

export default function MyEquipmentPage() {
  const { role } = useDashboard();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "owner") return;
    apiFetch("/my-equipment")
      .then(setItems)
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment? This cannot be undone."))
      return;
    try {
      await apiFetch(`/equipment/${id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item._id !== id));
      toast.success("Equipment deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">My Equipment</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          You have not added any equipment yet.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    ৳{item.price} / {item.rentalType}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/equipment/${item._id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                        )}
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/edit-equipment/${item._id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                        )}
                      >
                        Update
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        Delete
                      </Button>
                    </div>
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

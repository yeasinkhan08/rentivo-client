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

export default function AllEquipmentPage() {
  const { role } = useDashboard();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") return;
    apiFetch("/admin/equipment")
      .then(setItems)
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

  const changeStatus = async (id, status) => {
    try {
      await apiFetch(`/admin/equipment/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setItems((current) =>
        current.map((item) => (item._id === id ? { ...item, status } : item)),
      );
      toast.success(`Equipment ${status}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      <h1 className="text-2xl font-bold">All Equipment</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No equipment yet.</p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.ownerEmail}</TableCell>
                  <TableCell>
                    ৳{item.price} / {item.rentalType}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => changeStatus(item._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => changeStatus(item._id, "rejected")}
                      >
                        Reject
                      </Button>
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

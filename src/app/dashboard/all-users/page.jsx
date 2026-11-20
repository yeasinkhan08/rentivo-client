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
import { useDashboard } from "@/context/DashboardContext";
import { apiFetch } from "@/lib/api";

export default function AllUsersPage() {
  const { role, user } = useDashboard();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") return;
    apiFetch("/users")
      .then(setUsers)
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

  const changeRole = async (id, newRole) => {
    try {
      await apiFetch(`/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });
      setUsers((current) =>
        current.map((item) =>
          item._id === id ? { ...item, role: newRole } : item,
        ),
      );
      toast.success("Role updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">All Users</h1>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="mt-6 rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <select
                      value={item.role || "customer"}
                      disabled={item.email === user.email}
                      onChange={(event) =>
                        changeRole(item._id, event.target.value)
                      }
                      className="h-9 rounded-lg border border-input bg-background px-2 text-sm disabled:opacity-60"
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
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

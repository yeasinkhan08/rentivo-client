"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export function useRole() {
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!session) return;
    apiFetch(`/users/role/${session.user.email}`)
      .then((data) => setRole(data.role))
      .catch(() => setRole(null));
  }, [session]);

  return { session, isPending, role };
}

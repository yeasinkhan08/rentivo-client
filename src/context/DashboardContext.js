"use client";

import { createContext, useContext } from "react";

export const DashboardContext = createContext({ user: null, role: null });

export function useDashboard() {
  return useContext(DashboardContext);
}

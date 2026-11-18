"use client";

import { useSyncExternalStore } from "react";
import { Toaster } from "sonner";

function subscribe(callback) {
  window.addEventListener("rentivo-theme-change", callback);
  return () => window.removeEventListener("rentivo-theme-change", callback);
}

function getSnapshot() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot() {
  return "dark";
}

export default function ToasterClient() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <Toaster theme={theme} position="top-center" richColors closeButton />;
}

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

function PaymentResult() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!sessionId || started.current) return;
    started.current = true;

    apiFetch("/bookings/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
      .then(() => setState("success"))
      .catch((error) => {
        setMessage(error.message);
        setState("error");
      });
  }, [sessionId]);

  if (!sessionId || state === "error") {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Payment could not be confirmed</h1>
        <p className="mt-2 text-sm text-red-500">
          {message || "Missing payment session."}
        </p>
        <Link href="/all-equipment" className={cn(buttonVariants(), "mt-6")}>
          Back to equipment
        </Link>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        <p className="text-sm text-muted-foreground">
          Confirming your payment...
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-500">
        ✓
      </div>
      <h1 className="mt-4 text-2xl font-bold">Payment successful</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your rental is booked. You can track it in your dashboard.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/dashboard/my-rentals"
          className={cn(
            buttonVariants(),
            "bg-linear-to-r from-sky-500 to-blue-600 text-white",
          )}
        >
          View my rentals
        </Link>
        <Link
          href="/all-equipment"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Browse more
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Suspense fallback={null}>
        <PaymentResult />
      </Suspense>
    </div>
  );
}

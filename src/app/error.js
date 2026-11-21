"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center px-4 text-center">
      <div>
        <p className="text-6xl font-bold text-sky-500">Oops</p>
        <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error happened. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

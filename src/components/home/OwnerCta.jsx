import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

export default function OwnerCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="rounded-3xl bg-linear-to-r from-sky-600 to-blue-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Own equipment that sits idle?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sky-100">
            List it on Rentivo as an owner and earn from every rental. Our
            admins review every listing so renters can trust it.
          </p>
          <Link
            href="/Register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 h-11 rounded-xl bg-white px-6 font-semibold text-blue-700 hover:bg-sky-50",
            )}
          >
            Become an owner
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

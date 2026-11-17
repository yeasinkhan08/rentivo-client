import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, PlayCircle, ShieldCheck, Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Verified listings",
    description: "Quality you can trust",
  },
  {
    icon: Clock3,
    title: "Flexible rentals",
    description: "Daily, weekly or monthly",
  },
  {
    icon: BadgeCheck,
    title: "Reliable support",
    description: "Help whenever you need it",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_100%)]"
      >
        <Image
          src="/images/hero-construction.jpg"
          alt="Construction crew and equipment working on site"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-background/70 via-transparent to-background/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-sky-950/20 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
      />

      <div className="mx-auto flex min-h-[36rem] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:min-h-[40rem] lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-sky-400" />
            </span>
            Equipment rental, simplified
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Rent the{" "}
            <span className="bg-linear-to-r from-sky-300 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              right equipment
            </span>{" "}
            for every build.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Rentivo connects contractors and teams with trusted construction
            equipment. Browse, compare and book the tools you need in minutes —
            with flexible rates and reliable support.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/all-equipment"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-blue-500"
              )}
            >
              Browse equipment <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-border/70 bg-background/40 px-5 text-sm font-semibold"
              )}
            >
              <PlayCircle className="size-4" /> See how it works
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10 text-sky-300">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-5 z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-[#071227]/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:inline-flex">
        <span className="size-2 rounded-full bg-emerald-400" />
        Available today
      </div>

      <div className="absolute right-5 bottom-6 z-10 hidden max-w-sm items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#071227]/75 p-4 backdrop-blur-md lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
            <BadgeCheck className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              Trusted by 2,000+ teams
            </p>
            <p className="text-xs text-slate-300">Verified renters &amp; suppliers</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-300">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-current" />
          ))}
          <span className="ml-1 text-xs font-semibold text-white">4.9</span>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CalendarDays, Eye, ShieldCheck, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/home/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { cn } from "@/lib/utils";

export const metadata = { title: "About us — RENTIVO" };

const values = [
  {
    icon: Users,
    title: "Community first",
    text: "We connect equipment owners and customers in one trusted marketplace.",
  },
  {
    icon: Eye,
    title: "Transparency",
    text: "Clear prices, clear terms and clear availability before you book.",
  },
  {
    icon: CalendarDays,
    title: "Flexibility",
    text: "Daily, weekly or monthly rentals that fit your project.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text: "Admin-approved listings and secure online payments with Stripe.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About us"
            title="Making equipment rental simple and trustworthy"
            description="Rentivo is a rental marketplace where owners earn from equipment that would otherwise sit idle, and customers get what they need without the cost of buying."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Our mission</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We want every project, from a wedding shoot to a building site, to
              have access to the right equipment at a fair price. By connecting
              people who own equipment with people who need it, we make renting
              as easy as shopping online.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="h-full rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold">How we keep it reliable</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every listing is reviewed by an admin before it appears on the
              platform. Payments are handled securely, bookings are checked
              against availability, and owners and customers each get their own
              dashboard to track everything in one place.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our values" title="What we stand for" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-300">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/all-equipment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 font-semibold text-white",
            )}
          >
            Browse equipment
          </Link>
        </div>
      </section>
    </div>
  );
}

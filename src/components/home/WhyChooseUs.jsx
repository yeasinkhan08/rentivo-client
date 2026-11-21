import { CalendarDays, CreditCard, ShieldCheck, Wallet } from "lucide-react";

import Reveal from "@/components/home/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const benefits = [
  {
    icon: Wallet,
    title: "Affordable rental prices",
    text: "Rent only for the time you need instead of buying expensive equipment.",
  },
  {
    icon: ShieldCheck,
    title: "Verified equipment owners",
    text: "Every listing is reviewed and approved by our admins before it goes live.",
  },
  {
    icon: CalendarDays,
    title: "Flexible rental periods",
    text: "Choose daily, weekly or monthly rentals that fit your project.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    text: "Pay safely online with Stripe. Your booking is confirmed instantly.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Why Rentivo"
        title="Why choose us"
        description="A transparent and secure rental marketplace for owners and customers."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }, index) => (
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
    </section>
  );
}

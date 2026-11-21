import { CalendarDays, CreditCard, Search, Truck } from "lucide-react";

import Reveal from "@/components/home/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "1. Find equipment",
    text: "Search and filter approved equipment by category, location and price.",
  },
  {
    icon: CalendarDays,
    title: "2. Choose your dates",
    text: "Pick the rental period and quantity. The total is calculated for you.",
  },
  {
    icon: CreditCard,
    title: "3. Pay securely",
    text: "Complete your payment on Stripe and get an instant confirmation.",
  },
  {
    icon: Truck,
    title: "4. Get it delivered",
    text: "The owner prepares the equipment for your delivery address.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Rent equipment in four simple steps"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
                <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-blue-600 text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

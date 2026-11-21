import { Star } from "lucide-react";

import Reveal from "@/components/home/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const reviews = [
  {
    name: "Rafiq Ahmed",
    rating: 5,
    comment:
      "Booking was quick and the excavator arrived on time. The price was far cheaper than buying.",
  },
  {
    name: "Nusrat Jahan",
    rating: 5,
    comment:
      "I rented a camera kit for a wedding shoot. Everything was in perfect condition.",
  },
  {
    name: "Tanvir Hossain",
    rating: 4,
    comment:
      "Easy to compare options and pay online. Support answered all my questions.",
  },
  {
    name: "Sadia Islam",
    rating: 5,
    comment:
      "Listing my event equipment took minutes, and I started receiving bookings in days.",
  },
];

export default function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Reviews"
        title="What our customers say"
        description="Real experiences from people who rent and list on Rentivo."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <Reveal key={review.name} delay={index * 0.1} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < review.rating ? "fill-current" : "opacity-30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &ldquo;{review.comment}&rdquo;
              </p>
              <p className="mt-auto pt-2 text-sm font-semibold">
                {review.name}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

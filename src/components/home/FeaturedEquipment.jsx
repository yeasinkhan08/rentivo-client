"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import EquipmentCard from "@/components/shared/EquipmentCard";
import SectionHeading from "@/components/home/SectionHeading";
import { publicFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedEquipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicFetch("/equipment/featured")
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Featured"
        title="Featured equipment"
        description="Hand-picked, approved equipment ready to rent today."
      />

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[26rem] animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No approved equipment yet. Check back soon.
        </p>
      ) : (
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariant}
              className="h-full"
            >
              <EquipmentCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/all-equipment"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 rounded-xl px-6",
          )}
        >
          View all equipment
        </Link>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Cpu,
  HardHat,
  PartyPopper,
  Tractor,
  Truck,
} from "lucide-react";

import SectionHeading from "@/components/home/SectionHeading";

const categories = [
  {
    name: "Construction Equipment",
    icon: HardHat,
    text: "Excavators, mixers, drills and more.",
  },
  {
    name: "Photography Equipment",
    icon: Camera,
    text: "Cameras, lenses, lights and tripods.",
  },
  {
    name: "Vehicles & Transportation",
    icon: Truck,
    text: "Vans, trucks and utility vehicles.",
  },
  {
    name: "Agriculture Equipment",
    icon: Tractor,
    text: "Tractors, sprayers and harvesters.",
  },
  {
    name: "Electronics",
    icon: Cpu,
    text: "Laptops, projectors and audio gear.",
  },
  {
    name: "Event Equipment",
    icon: PartyPopper,
    text: "Stages, tents, sound and lighting.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Categories() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Popular equipment categories"
          description="Find what you need by category."
        />

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map(({ name, icon: Icon, text }) => (
            <motion.div key={name} variants={itemVariant} className="h-full">
              <Link
                href={`/all-equipment?category=${encodeURIComponent(name)}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 transition group-hover:bg-sky-500 group-hover:text-white dark:text-sky-300">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

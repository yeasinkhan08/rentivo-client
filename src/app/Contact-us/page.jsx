"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/home/SectionHeading";

// replace these with your real contact details
const contactInfo = [
  { icon: Mail, title: "Email", text: "support@rentivo.com" },
  { icon: Phone, title: "Phone", text: "+880 1XXX-XXXXXX" },
  { icon: MapPin, title: "Address", text: "Dhaka, Bangladesh" },
  { icon: Clock, title: "Support hours", text: "Sat - Thu, 9:00 AM - 6:00 PM" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.message || "Could not send message");

      toast.success("Message sent. We will get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact us"
        title="We would love to hear from you"
        description="Questions about renting or listing equipment? Send us a message."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {contactInfo.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-300">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" required maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              required
              maxLength={2000}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white"
          >
            {loading ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
}

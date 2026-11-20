"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import { calculateTotal } from "@/lib/booking";

export default function BookingModal({ item, open, onOpenChange }) {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const datesValid = startDate && endDate && endDate >= startDate;
  const summary = datesValid
    ? calculateTotal(item, startDate, endDate, Number(quantity) || 1)
    : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    if (!datesValid) {
      toast.error("End date must be on or after the start date.");
      return;
    }
    if (Number(data.quantity) > item.quantity) {
      toast.error(`Only ${item.quantity} unit(s) available.`);
      return;
    }

    try {
      setLoading(true);
      const { url } = await apiFetch("/bookings/checkout", {
        method: "POST",
        body: JSON.stringify({ ...data, equipmentId: item._id }),
      });
      window.location.href = url; // go to Stripe Checkout
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book {item.name}</DialogTitle>
          <DialogDescription>
            ৳{item.price} per {item.rentalType.toLowerCase()} rental period.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="startDate">Rental start date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              min={today}
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="endDate">Rental end date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              min={startDate || today}
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quantity">Required quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max={item.quantity}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact">Contact number</Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              required
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="address">Delivery address</Label>
            <Input id="address" name="address" required />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="notes">Additional notes</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-sm sm:col-span-2">
            {summary ? (
              <>
                <p>
                  {summary.days} day(s) = {summary.units}{" "}
                  {item.rentalType.toLowerCase()} period(s) ×{" "}
                  {Number(quantity) || 1} unit(s)
                </p>
                <p className="mt-1 text-lg font-bold">
                  Total: ৳{summary.total}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Choose your dates to see the total.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 font-semibold text-white sm:col-span-2"
          >
            {loading ? "Redirecting to payment..." : "Confirm and pay"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

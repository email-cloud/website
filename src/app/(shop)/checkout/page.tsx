"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsConfirmed, setTermsConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    lines.length > 0 &&
    ageConfirmed &&
    termsConfirmed &&
    name &&
    email &&
    phone &&
    (fulfillment === "pickup" || address);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ id: l.id, quantity: l.quantity })),
          fulfillment,
          name,
          email,
          phone,
          address: fulfillment === "delivery" ? address : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Checkout
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <fieldset className="rounded-xl border border-border bg-white p-5">
            <legend className="px-1 text-sm font-semibold text-brand-dark">
              Fulfillment Method
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label
                className={`cursor-pointer rounded-lg border p-3 text-sm ${
                  fulfillment === "pickup"
                    ? "border-brand bg-surface"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="fulfillment"
                  value="pickup"
                  checked={fulfillment === "pickup"}
                  onChange={() => setFulfillment("pickup")}
                  className="mr-2"
                />
                Store Pickup
              </label>
              <label
                className={`cursor-pointer rounded-lg border p-3 text-sm ${
                  fulfillment === "delivery"
                    ? "border-brand bg-surface"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="fulfillment"
                  value="delivery"
                  checked={fulfillment === "delivery"}
                  onChange={() => setFulfillment("delivery")}
                  className="mr-2"
                />
                Local Delivery
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Delivery is available within our local service area only.
              Interstate alcohol shipping is not permitted.
            </p>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-white p-5">
            <legend className="px-1 text-sm font-semibold text-brand-dark">
              Contact Information
            </legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none sm:col-span-2"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
              />
              {fulfillment === "delivery" && (
                <textarea
                  required
                  placeholder="Delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="rounded-lg border border-border px-3 py-2.5 text-sm focus:border-brand focus:outline-none sm:col-span-2"
                />
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-3 rounded-xl border border-border bg-white p-5">
            <legend className="px-1 text-sm font-semibold text-brand-dark">
              Confirmation
            </legend>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              I confirm I am 21 years of age or older and will present valid
              government-issued photo ID upon pickup or delivery.
            </label>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={termsConfirmed}
                onChange={(e) => setTermsConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              I agree to the{" "}
              <Link href="/legal/terms" className="text-brand underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-brand underline">
                Privacy Policy
              </Link>
              .
            </label>
          </fieldset>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {submitting ? "Redirecting to secure payment..." : "Continue to Payment"}
          </button>
          <p className="text-center text-[11px] text-gray-400">
            Payment is securely processed by Stripe. We never store your card
            details.
          </p>
        </form>

        <div className="h-fit rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-brand-dark">
            Order Summary
          </h2>
          <div className="mt-3 space-y-2">
            {lines.map((l) => (
              <div key={l.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {l.name} &times; {l.quantity}
                </span>
                <span className="font-medium text-brand-dark">
                  {formatPrice(l.price * l.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-brand-dark">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              Tax and delivery fees calculated at the payment step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

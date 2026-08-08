import Link from "next/link";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let amountTotal: number | null = null;

  if (session_id && isStripeConfigured()) {
    try {
      const stripe = getStripe()!;
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      amountTotal = session.amount_total ? session.amount_total / 100 : null;
    } catch {
      // session lookup failed; still show a generic confirmation
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <ClearCartOnMount />
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
        ✓
      </div>
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Order Confirmed
      </h1>
      <p className="mt-3 text-gray-500">
        Thank you{email ? `, we've sent a receipt to ${email}` : ""}!
        We&apos;ll text or email you when your order is ready.
      </p>
      {amountTotal !== null && (
        <p className="mt-1 text-sm text-gray-400">
          Total charged: ${amountTotal.toFixed(2)}
        </p>
      )}
      <p className="mt-4 text-xs text-gray-400">
        Please have a valid government-issued photo ID ready for pickup or
        delivery &mdash; you must be 21+ to receive this order.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

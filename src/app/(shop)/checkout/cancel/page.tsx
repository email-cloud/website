import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Checkout Canceled
      </h1>
      <p className="mt-3 text-gray-500">
        Your payment was not completed and you have not been charged. Your
        cart is still saved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/cart"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-brand-dark hover:border-brand"
        >
          Return to Cart
        </Link>
        <Link
          href="/"
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

import LegalNotice from "@/components/LegalNotice";

export const metadata = { title: "Delivery & Pickup | Convenience Liquors" };

export default function ShippingPage() {
  return (
    <>
      <LegalNotice />
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Delivery &amp; Pickup
      </h1>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
        <h2 className="text-base font-semibold text-brand-dark">
          Store Pickup
        </h2>
        <p>
          Orders placed for pickup are typically ready within one hour during
          business hours. Bring a valid, unexpired government-issued photo ID
          &mdash; the name does not need to match the account, but the person
          picking up must be 21 or older and will be ID&apos;d at the counter.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          Local Delivery
        </h2>
        <p>
          We deliver within a limited radius of our store at [City, State].
          Enter your address at checkout to confirm eligibility. A person 21
          years or older must be present to sign for and accept delivery; our
          driver will check ID and may refuse delivery if the recipient
          appears intoxicated or cannot provide valid proof of age.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          No Interstate Shipping
        </h2>
        <p>
          State alcohol beverage control laws generally prohibit shipping
          alcohol directly to consumers across state lines without a special
          shipping license. Because of this, we currently only fulfill orders
          via local pickup or delivery within our licensed service area.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          Tobacco Products
        </h2>
        <p>
          Tobacco and cigar products shown on this Site are available for
          in-store purchase only. Federal law (the PACT Act) imposes strict
          requirements on mailing or shipping tobacco products, so these
          items cannot be ordered online or delivered.
        </p>
      </div>
    </>
  );
}

import LegalNotice from "@/components/LegalNotice";

export const metadata = { title: "Terms of Use | Convenience Liquors" };

export default function TermsPage() {
  return (
    <>
      <LegalNotice />
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Terms of Use
      </h1>
      <p className="mt-2 text-xs text-gray-400">Last updated: [Date]</p>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
        <p>
          Welcome to Convenience Liquors (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). By accessing or using this website
          (&quot;Site&quot;), you agree to be bound by these Terms of Use.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          1. Age Requirement
        </h2>
        <p>
          This Site sells alcoholic beverages and, where noted, tobacco
          products. You must be at least 21 years old to access this Site,
          create an account, or place an order. By using this Site, you
          represent and warrant that you are 21 years of age or older. We
          verify age at account creation, at checkout, and again with
          government-issued photo ID at the time of pickup or delivery. We
          reserve the right to refuse or cancel any order if we cannot verify
          the purchaser or recipient is 21 or older.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          2. Product Availability &amp; Pricing
        </h2>
        <p>
          All prices are listed in U.S. dollars and are subject to change
          without notice. We make reasonable efforts to ensure pricing and
          product availability are accurate, but errors may occur. In the
          event of a pricing or listing error, we reserve the right to cancel
          any order arising from that error, even after payment has been
          submitted, with a full refund.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          3. Local Pickup &amp; Delivery Only
        </h2>
        <p>
          Due to state and federal alcohol beverage control laws, we only
          fulfill orders via in-store pickup or local delivery within our
          licensed service area of [City, State]. We do not ship alcohol
          across state lines or internationally. Tobacco products listed on
          this Site are available for in-store purchase only and cannot be
          purchased online, consistent with the federal PACT Act.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          4. Prohibited Conduct
        </h2>
        <p>
          You may not use this Site to purchase alcohol or tobacco on behalf
          of, or for delivery to, anyone under the age of 21. Reselling
          products purchased through this Site without proper licensure is
          prohibited.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          5. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, Convenience Liquors is not
          liable for any indirect, incidental, or consequential damages
          arising from your use of this Site or the products purchased
          through it.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          6. Governing Law
        </h2>
        <p>
          These Terms are governed by the laws of the State of [State],
          without regard to its conflict of laws principles.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          7. Contact Us
        </h2>
        <p>
          Questions about these Terms? Contact us at [contact email / phone]
          or visit us at [store address].
        </p>
      </div>
    </>
  );
}

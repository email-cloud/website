import LegalNotice from "@/components/LegalNotice";

export const metadata = { title: "Privacy Policy | Convenience Liquors" };

export default function PrivacyPage() {
  return (
    <>
      <LegalNotice />
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Privacy Policy
      </h1>
      <p className="mt-2 text-xs text-gray-400">Last updated: [Date]</p>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
        <p>
          This Privacy Policy explains how Convenience Liquors
          (&quot;we,&quot; &quot;us&quot;) collects, uses, and protects
          information when you use this Site.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          Information We Collect
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Contact information you provide at checkout (name, email, phone,
            delivery address).
          </li>
          <li>
            Date of birth information used solely for age verification and
            not stored beyond what is required to confirm eligibility.
          </li>
          <li>
            Order history and cart contents, stored locally in your browser
            unless you complete a purchase.
          </li>
          <li>
            Payment information, which is collected and processed directly
            by our payment processor, Stripe. We do not store your full card
            number on our servers.
          </li>
        </ul>

        <h2 className="text-base font-semibold text-brand-dark">
          How We Use Information
        </h2>
        <p>
          We use the information we collect to process and fulfill orders,
          verify legal drinking age, communicate order status, and comply
          with state alcohol beverage control recordkeeping requirements.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          Data Sharing
        </h2>
        <p>
          We share order and payment information with our payment processor
          (Stripe) solely to process transactions. We do not sell your
          personal information to third parties.
        </p>

        <h2 className="text-base font-semibold text-brand-dark">
          Your Choices
        </h2>
        <p>
          You may clear your locally stored cart at any time through your
          browser. To request deletion of information we hold about you,
          contact us at [contact email].
        </p>

        <h2 className="text-base font-semibold text-brand-dark">Contact</h2>
        <p>
          Questions about this policy? Contact us at [contact email / phone].
        </p>
      </div>
    </>
  );
}

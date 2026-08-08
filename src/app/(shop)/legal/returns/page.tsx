import LegalNotice from "@/components/LegalNotice";

export const metadata = { title: "Returns | Convenience Liquors" };

export default function ReturnsPage() {
  return (
    <>
      <LegalNotice />
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Returns
      </h1>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
        <p>
          Due to state alcohol beverage control regulations, opened alcohol
          products generally cannot be returned or refunded. Many states
          restrict retailers from accepting returned alcohol at all, opened
          or unopened.
        </p>
        <h2 className="text-base font-semibold text-brand-dark">
          Damaged or Incorrect Items
        </h2>
        <p>
          If your order arrives damaged, or you receive the wrong item,
          contact us within 48 hours at [contact email / phone] with your
          order number and photos of the issue, and we will arrange a
          replacement or refund at our discretion, consistent with
          applicable state law.
        </p>
        <h2 className="text-base font-semibold text-brand-dark">
          Order Cancellations
        </h2>
        <p>
          Orders may be canceled prior to pickup or delivery by contacting us
          directly. Once an order has been fulfilled and picked up or
          delivered, it is considered final.
        </p>
      </div>
    </>
  );
}

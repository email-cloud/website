export const metadata = { title: "Responsible Drinking | Convenience Liquors" };

export default function ResponsiblePage() {
  return (
    <>
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Responsible Drinking
      </h1>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
        <p>
          Convenience Liquors is committed to promoting the responsible sale
          and consumption of alcohol. We are proud members of our community
          and take our role as a licensed retailer seriously.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>We sell only to individuals 21 years of age or older.</li>
          <li>We do not sell to anyone who appears intoxicated.</li>
          <li>
            We support designated-driver programs and encourage customers to
            plan a safe ride home.
          </li>
          <li>
            We participate in responsible beverage service training for our
            staff.
          </li>
        </ul>
        <p>
          If you or someone you know is struggling with alcohol use, help is
          available 24/7 through the SAMHSA National Helpline at{" "}
          <a href="tel:18006624357" className="text-brand underline">
            1-800-662-4357
          </a>{" "}
          or{" "}
          <a
            href="https://www.samhsa.gov/find-help/national-helpline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            samhsa.gov
          </a>
          .
        </p>
      </div>
    </>
  );
}

import { verifyAge } from "./actions";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function VerifyAgePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="min-h-screen bg-[#160b0e] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #5b0e2d 0%, transparent 45%), radial-gradient(circle at 80% 80%, #6b3410 0%, transparent 45%)",
        }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1f1216] p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8a1538] to-[#c17a2f] text-2xl font-bold text-white">
            CL
          </div>
          <h1 className="text-xl font-semibold text-white">
            Convenience Liquors
          </h1>
          <p className="mt-2 text-sm text-white/60">
            You must be 21 years of age or older to enter this site. Please
            confirm your date of birth.
          </p>
        </div>

        <form action={verifyAge} className="space-y-4">
          <input type="hidden" name="next" value={next ?? "/"} />
          <div className="grid grid-cols-3 gap-3">
            <label className="sr-only" htmlFor="month">Month</label>
            <select
              id="month"
              name="month"
              required
              defaultValue=""
              className="col-span-1 rounded-lg border border-white/15 bg-[#160b0e] px-2 py-2.5 text-sm text-white focus:border-[#c17a2f] focus:outline-none"
            >
              <option value="" disabled>Month</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="day">Day</label>
            <select
              id="day"
              name="day"
              required
              defaultValue=""
              className="rounded-lg border border-white/15 bg-[#160b0e] px-2 py-2.5 text-sm text-white focus:border-[#c17a2f] focus:outline-none"
            >
              <option value="" disabled>Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              required
              defaultValue=""
              className="rounded-lg border border-white/15 bg-[#160b0e] px-2 py-2.5 text-sm text-white focus:border-[#c17a2f] focus:outline-none"
            >
              <option value="" disabled>Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-[#8a1538] to-[#c17a2f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Enter Site
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-white/40">
          By entering, you agree to our{" "}
          <a href="/legal/terms" className="underline hover:text-white/60">
            Terms of Use
          </a>{" "}
          and confirm you are of legal drinking age in your jurisdiction. We
          verify ID upon delivery or pickup. Please drink responsibly.
        </p>
      </div>
    </div>
  );
}

export default function AgeBlockedPage() {
  return (
    <div className="min-h-screen bg-[#160b0e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1f1216] p-8 text-center shadow-2xl">
        <h1 className="text-xl font-semibold text-white">
          Sorry, you must be 21+
        </h1>
        <p className="mt-3 text-sm text-white/60">
          This site sells alcohol and tobacco products and is restricted to
          visitors who are 21 years of age or older. You are not permitted to
          access this site.
        </p>
        <p className="mt-4 text-xs text-white/40">
          If you or someone you know needs help with alcohol use, contact the
          SAMHSA National Helpline at 1-800-662-4357.
        </p>
      </div>
    </div>
  );
}

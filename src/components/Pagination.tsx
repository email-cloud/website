import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  buildHref,
}: {
  totalPages: number;
  currentPage: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const items: (number | "gap")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) items.push("gap");
    items.push(p);
    prev = p;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-lg border border-border px-3 py-1.5 text-sm ${
          currentPage === 1
            ? "pointer-events-none text-gray-300"
            : "text-brand-dark hover:border-brand"
        }`}
      >
        Prev
      </Link>
      {items.map((it, i) =>
        it === "gap" ? (
          <span key={`gap-${i}`} className="px-2 text-gray-400">
            &hellip;
          </span>
        ) : (
          <Link
            key={it}
            href={buildHref(it)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              it === currentPage
                ? "border-brand bg-brand text-white"
                : "border-border text-brand-dark hover:border-brand"
            }`}
          >
            {it}
          </Link>
        )
      )}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-lg border border-border px-3 py-1.5 text-sm ${
          currentPage === totalPages
            ? "pointer-events-none text-gray-300"
            : "text-brand-dark hover:border-brand"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

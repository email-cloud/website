import Link from "next/link";
import type { Category } from "@/lib/types";

const ICONS: Record<string, string> = {
  wine: "🍷",
  "whiskey-bourbon": "🥃",
  vodka: "🧊",
  "tequila-mezcal": "🌵",
  rum: "🏝️",
  gin: "🌿",
  "brandy-cognac": "🍂",
  "liqueurs-cordials": "🍸",
  beer: "🍺",
  "seltzers-rtd": "🥤",
  "mixers-non-alcoholic": "🧃",
  "snacks-munchies": "🥨",
  "party-bar-supplies": "🎉",
  tobacco: "🚬",
  "specialty-more": "✨",
};

export default function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="text-3xl">{ICONS[category.slug] ?? "🍾"}</span>
      <span className="text-sm font-semibold text-brand-dark group-hover:text-brand">
        {category.name}
      </span>
      <span className="text-[11px] text-gray-400">{category.count} items</span>
    </Link>
  );
}

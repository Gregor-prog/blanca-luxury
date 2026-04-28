"use client";

import Link from "next/link";
import { useGetCategoriesQuery } from "@/lib/store";

function Skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="aspect-[3/4] rounded-sm bg-[#2a2520] animate-pulse" />
      ))}
    </div>
  );
}

export function CollectionsTeaser() {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = (data?.items ?? []).slice(0, 4);

  return (
    <section className="bg-[#1A1410] py-24 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] text-[#C9A96E] tracking-[0.35em] uppercase mb-4">
            THE CATALOGUE
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-white leading-tight">
            Our Collections
          </h2>
        </div>
        <Link
          href="/collections"
          className="font-sans text-[11px] text-[#C9A96E] tracking-widest uppercase border-b border-[#C9A96E]/50 pb-1 hover:opacity-70 transition-opacity whitespace-nowrap self-end"
        >
          Browse All →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : categories.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Living", "Dining", "Bedroom", "Office"].map((name, i) => (
              <CategoryCard key={i} name={name} index={i} href="/collections" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} name={cat.name} index={i} href={`/collections/${cat.id}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryCard({ name, index, href }: { name: string; index: number; href: string }) {
  return (
    <Link href={href} className="group block relative aspect-[3/4] overflow-hidden rounded-sm bg-[#2C2420]">
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, hsl(${20 + index * 8},15%,16%) 0%, hsl(${20 + index * 8},12%,10%) 100%)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A96E] transition-all duration-500 group-hover:w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <span className="font-sans text-[9px] text-[#C9A96E]/50 tracking-[0.3em] uppercase mb-3">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif italic text-white text-xl md:text-2xl text-center group-hover:text-[#C9A96E] transition-colors duration-300">
          {name}
        </h3>
      </div>
      <span className="absolute bottom-4 right-4 font-sans text-[9px] text-white/30 group-hover:text-[#C9A96E] transition-colors duration-300">
        Explore →
      </span>
    </Link>
  );
}

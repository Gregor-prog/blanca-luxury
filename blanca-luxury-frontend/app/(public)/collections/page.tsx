"use client";

import React from "react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/lib/store";

// ─── skeleton ─────────────────────────────────────────────────────────────────

function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-sm bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] mb-4" />
      <div className="h-3 w-24 bg-[#E8E0D5] rounded mb-2" />
      <div className="h-5 w-40 bg-[#E8E0D5] rounded" />
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const categories = categoriesData?.items ?? [];

  return (
    <main className="min-h-screen bg-[#fff8f1]">
      {/* ── Hero ── */}
      <section className="bg-[#1A1410] flex flex-col items-center justify-center text-center relative overflow-hidden px-6 py-28 md:py-36">
        <span className="text-[10px] text-[#C9A96E] font-sans tracking-[0.35em] uppercase mb-5">
          CATALOGUE
        </span>
        <h1 className="text-white font-serif italic text-5xl md:text-[64px] tracking-tight leading-none">
          The Collection
        </h1>
        <p className="mt-6 font-sans text-[13px] text-white/40 tracking-wide max-w-md leading-relaxed">
          Bespoke Italian &amp; Turkish furniture for Nigeria&apos;s most distinguished interiors.
        </p>
        {/* Decorative gold line */}
        <div className="mt-10 w-16 h-px bg-[#C9A96E]/50" />
      </section>

      {/* ── Category Grid ── */}
      <section className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-serif italic text-2xl md:text-3xl text-[#1e1b15]">
            Browse by Collection
          </h2>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#8B7D72]">
            {isLoading ? "—" : `${categories.length} categories`}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => <CategorySkeleton key={n} />)}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-px bg-[#C9A96E]/30 mb-8" />
            <h3 className="font-serif italic text-2xl text-[#1e1b15] mb-3">
              No collections yet
            </h3>
            <p className="font-sans text-sm text-[#8B7D72]">
              Our curated catalogue is being assembled. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.id}`}
                className="group block"
              >
                {/* Image placeholder — gold-tinted panel with name overlay */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#2C2420] mb-4">
                  {/* Subtle pattern / gradient */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, #2C2420 0%, #1A1410 60%, #3a2e28 100%)`,
                    }}
                  />
                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A96E] transition-all duration-500 group-hover:w-full" />
                  {/* Category index number */}
                  <span
                    className="absolute top-4 left-5 font-sans text-[10px] text-[#C9A96E]/40 tracking-[0.3em]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {/* Category name centred */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                    <h3 className="font-serif italic text-white text-2xl md:text-3xl text-center leading-tight group-hover:text-[#C9A96E] transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                  {/* Arrow indicator */}
                  <span className="absolute bottom-4 right-5 font-sans text-[10px] text-white/30 group-hover:text-[#C9A96E] transition-colors duration-300">
                    Explore →
                  </span>
                </div>

                {/* Text below card */}
                <div className="px-1">
                  <span className="block font-sans text-[9px] text-[#C9A96E] uppercase tracking-[0.25em] mb-1">
                    Collection
                  </span>
                  <h4 className="font-serif text-[18px] text-[#1e1b15] group-hover:text-[#745a27] transition-colors duration-200">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Prestige strip ── */}
      <section className="bg-[#1A1410] py-20 px-6 text-center border-t border-[#C9A96E]/10">
        <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] mb-5">
          Our Promise
        </p>
        <h2 className="font-serif italic text-3xl md:text-4xl text-white max-w-2xl mx-auto leading-snug">
          Every piece sourced from the world&apos;s finest artisans
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {["Italian Craftsmanship", "Turkish Textiles", "Bespoke Commissions", "White-Glove Delivery"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B7D72]">{s}</span>
              {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-[#C9A96E] self-center" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

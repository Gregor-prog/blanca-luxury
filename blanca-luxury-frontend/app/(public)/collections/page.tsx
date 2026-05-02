"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetCollectionsQuery } from "@/lib/store";
import type { Collection } from "@/lib/types";

function CollectionCard({ col, idx }: { col: Collection; idx: number }) {
  return (
    <Link href={`/collections/${col.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#2C2420] mb-4">
        {col.coverImageUrl ? (
          <Image
            src={col.coverImageUrl}
            alt={col.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, #2C2420 0%, #1A1410 60%, #3a2e28 100%)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A96E] transition-all duration-500 group-hover:w-full" />
        <span className="absolute top-4 left-5 font-sans text-[10px] text-[#C9A96E]/60 tracking-[0.3em]">
          {String(idx + 1).padStart(2, "0")}
        </span>
        {col.badgeText && (
          <span className="absolute top-4 right-4 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border border-[#C9A96E]/50 text-[#C9A96E] rounded-sm bg-[#1A1410]/60">
            {col.badgeText}
          </span>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h3 className="font-serif italic text-white text-2xl md:text-3xl text-center leading-tight group-hover:text-[#C9A96E] transition-colors duration-300 drop-shadow-lg">
            {col.name}
          </h3>
        </div>
        <span className="absolute bottom-4 right-5 font-sans text-[10px] text-white/30 group-hover:text-[#C9A96E] transition-colors duration-300">
          Explore →
        </span>
      </div>
      <div className="px-1">
        <span className="block font-sans text-[9px] text-[#C9A96E] uppercase tracking-[0.25em] mb-1">
          Collection
        </span>
        <h4 className="font-serif text-[18px] text-[#1e1b15] group-hover:text-[#745a27] transition-colors duration-200">
          {col.name}
        </h4>
        {col._count?.products != null && (
          <p className="font-sans text-[10px] text-[#8B7D72] mt-0.5">{col._count.products} pieces</p>
        )}
      </div>
    </Link>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div key={n}>
          <div className="aspect-[4/3] rounded-sm bg-[#E8E0D5] mb-4" />
          <div className="h-3 w-24 bg-[#E8E0D5] rounded mb-2" />
          <div className="h-5 w-40 bg-[#E8E0D5] rounded" />
        </div>
      ))}
    </div>
  );
}

export default function CollectionsPage() {
  const { data, isLoading } = useGetCollectionsQuery();
  const collections = data?.items ?? [];

  return (
    <main className="min-h-screen bg-[#fff8f1]">
      {/* Hero */}
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
        <div className="mt-10 w-16 h-px bg-[#C9A96E]/50" />
      </section>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-serif italic text-2xl md:text-3xl text-[#1e1b15]">
            Browse by Collection
          </h2>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#8B7D72]">
            {isLoading ? "—" : `${collections.length} collections`}
          </span>
        </div>

        {isLoading ? (
          <Skeleton />
        ) : collections.length === 0 ? (
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
            {collections.map((col, idx) => (
              <CollectionCard key={col.id} col={col} idx={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Prestige strip */}
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

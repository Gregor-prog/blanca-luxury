"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/lib/store";
import type { ProductListItem } from "@/lib/types";

// ─── helpers ─────────────────────────────────────────────────────────────────

function primaryImage(product: ProductListItem): string {
  const primary = product.media.find((m) => m.isPrimary) ?? product.media[0];
  return primary?.url ?? "/placeholder.jpg";
}

function primaryAlt(product: ProductListItem): string {
  const primary = product.media.find((m) => m.isPrimary) ?? product.media[0];
  return primary?.altText ?? product.name;
}

function formatPrice(product: ProductListItem): string {
  if (product.priceOnRequest || !product.price) return "Price on Request";
  return `$${Number(product.price).toLocaleString()}`;
}

// ─── skeleton ─────────────────────────────────────────────────────────────────

function ProductSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={`flex ${viewMode === "list" ? "flex-row h-[240px]" : "flex-col"} gap-6 animate-pulse`}
    >
      <div
        className={`${viewMode === "list" ? "w-1/3 h-full" : "aspect-[4/3]"} rounded-[4px] bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite]`}
      />
      <div className="space-y-3 px-2 flex-1">
        <div className="h-2 w-16 bg-[#E8E0D5] rounded" />
        <div className="h-4 w-48 bg-[#E8E0D5] rounded" />
        <div className="h-2 w-32 bg-[#E8E0D5] rounded" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 w-12 bg-[#E8E0D5] rounded" />
          <div className="font-sans text-[11px] text-[#C9A96E] italic">
            Curating your collection…
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Categories fetched once and cached for 10 min
  const { data: categoriesData } = useGetCategoriesQuery();

  // Products re-fetched whenever category changes; cached per query key for 5 min
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(
    activeCategoryId ? { categoryId: activeCategoryId } : {},
  );

  const products = productsData?.items ?? [];
  const categories = categoriesData?.items ?? [];

  // Derived label shown in filter bar
  const activeCategoryName = useMemo(() => {
    if (!activeCategoryId) return "All Products";
    return categoriesData?.byId[activeCategoryId]?.name ?? "All Products";
  }, [activeCategoryId, categoriesData]);

  const isSpinning = isLoading || isFetching;

  return (
    <main className="pt-24 min-h-screen bg-[#fff8f1]">
      {/* Hero Catalogue Header */}
      <section className="h-[320px] bg-[#1A1410] flex flex-col items-center justify-center text-center relative overflow-hidden px-6">
        <span className="text-[10px] text-[#C9A96E] font-sans tracking-[0.3em] uppercase mb-4">
          CATALOGUE
        </span>
        <h1 className="text-white font-serif italic text-5xl md:text-6xl lg:text-[64px] tracking-tight leading-none mb-10">
          The Collection
        </h1>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {/* ALL pill */}
          <button
            onClick={() => setActiveCategoryId(null)}
            className={`px-6 py-2 rounded-full font-sans text-[10px] font-bold tracking-widest transition-all duration-300 ${
              activeCategoryId === null
                ? "bg-[#C9A96E] text-[#1A1410] border border-[#C9A96E]"
                : "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1410]"
            }`}
          >
            ALL
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-6 py-2 rounded-full font-sans text-[10px] font-bold tracking-widest transition-all duration-300 ${
                activeCategoryId === cat.id
                  ? "bg-[#C9A96E] text-[#1A1410] border border-[#C9A96E]"
                  : "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1410]"
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-24 z-40 bg-[#FAF8F5] border-b border-[#E8E0D5] py-3 px-4 md:px-12 flex flex-wrap gap-y-2 justify-between items-center">
        <div className="text-[11px] md:text-[12px] font-sans text-[#695c52] tracking-wide">
          Showing:{" "}
          <span className="font-bold text-[#1e1b15]">
            {activeCategoryName} ({isSpinning ? "—" : products.length})
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3 text-[#695c52]">
            <span
              className={`material-symbols-outlined cursor-pointer hover:text-[#745a27] transition-colors text-[20px] ${viewMode === "grid" ? "text-[#745a27]" : ""}`}
              onClick={() => setViewMode("grid")}
              style={{
                fontVariationSettings:
                  viewMode === "grid" ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              grid_view
            </span>
            <span
              className={`material-symbols-outlined cursor-pointer hover:text-[#745a27] transition-colors text-[20px] ${viewMode === "list" ? "text-[#745a27]" : ""}`}
              onClick={() => setViewMode("list")}
              style={{
                fontVariationSettings:
                  viewMode === "list" ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              view_list
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <section className="max-w-[1440px] mx-auto py-16 px-6 md:px-12">
        {isSpinning ? (
          <div
            className={`grid grid-cols-1 ${viewMode === "list" ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-x-8 gap-y-12`}
          >
            {[1, 2, 3].map((n) => (
              <ProductSkeleton key={n} viewMode={viewMode} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="w-24 h-24 text-[#E8E0D5] mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <h2 className="font-serif text-[24px] italic text-[#1e1b15] mb-4">
              No pieces found in this category.
            </h2>
            <button
              onClick={() => setActiveCategoryId(null)}
              className="font-sans text-[12px] font-bold text-[#C9A96E] uppercase tracking-widest hover:text-[#745a27] transition-colors border-b border-[#C9A96E] pb-1"
            >
              Explore all collections →
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${viewMode === "list" ? "gap-y-12" : "md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/collections/${product.id}`)}
                className={`group bg-white rounded-[4px] overflow-hidden cursor-pointer transition-all duration-500 hover:ring-1 hover:ring-[#C9A96E]/30 ${viewMode === "list" ? "flex flex-row h-[240px]" : ""}`}
              >
                <div
                  className={`${viewMode === "list" ? "w-1/3 h-full" : "aspect-[4/3]"} overflow-hidden bg-[#f5ede2]`}
                >
                  <img
                    alt={primaryAlt(product)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={primaryImage(product)}
                  />
                </div>
                <div
                  className={`p-6 flex flex-col justify-between ${viewMode === "list" ? "w-2/3" : ""}`}
                >
                  <div>
                    <span className="block font-sans text-[9px] text-[#C9A96E] font-bold tracking-[0.2em] mb-2 uppercase">
                      {product.category?.name ?? "—"}
                    </span>
                    <h3 className="font-serif text-[20px] text-[#1e1b15] mb-1">
                      {product.name}
                    </h3>
                    <p className="font-sans text-[11px] text-[#695c52] tracking-wide mb-4">
                      {product.origin}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-[18px] text-[#1e1b15]">
                      {formatPrice(product)}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-[#1e1b15] uppercase tracking-widest border-b border-[#C9A96E] pb-1 hover:text-[#745a27] cursor-pointer transition-colors">
                      Inquire →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isSpinning && productsData && productsData.totalPages > 1 && (
          <div className="mt-24 flex flex-col items-center gap-6">
            <p className="font-sans text-xs text-[#695c52] tracking-widest">
              Showing {products.length} of {productsData.total} pieces
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

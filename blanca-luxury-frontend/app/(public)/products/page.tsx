"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/lib/store";
import type { ProductListItem } from "@/lib/types";

function coverUrl(p: ProductListItem) {
  return p.media.find((m) => m.isPrimary)?.url ?? p.media[0]?.url ?? null;
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-[#ede7df] rounded-sm mb-3" />
          <div className="h-3 w-20 bg-[#ede7df] rounded mb-2" />
          <div className="h-4 w-36 bg-[#ede7df] rounded" />
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.items ?? [];

  const { data, isLoading, isFetching } = useGetProductsQuery(
    categoryId ? { categoryId } : {},
  );
  const products = data?.items ?? [];
  const isSpinning = isLoading || isFetching;

  return (
    <main className="min-h-screen bg-[#fff8f1]">
      {/* Hero */}
      <section className="bg-[#1A1410] flex items-center px-8 md:px-16 overflow-hidden py-28 md:py-36">
        <div className="max-w-4xl space-y-5">
          <p className="text-[#C9A96E] font-sans text-[10px] tracking-[0.3em] uppercase">
            THE CATALOGUE
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-serif italic font-light leading-tight">
            All Products
          </h1>
          <p className="text-[#8B7D72] text-sm font-sans max-w-lg leading-relaxed">
            Bespoke Italian &amp; Turkish furniture for Nigeria&apos;s most distinguished interiors.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-[#fff8f1] py-5 px-4 md:px-16 sticky top-[72px] z-40 border-b border-[#E8E0D5]/50">
        <div className="flex overflow-x-auto items-center gap-2 max-w-7xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setCategoryId(undefined)}
            className={`px-5 py-2 rounded-full font-sans text-[10px] tracking-wider uppercase transition-all whitespace-nowrap ${
              !categoryId
                ? "bg-[#C9A96E] font-bold text-[#1A1410]"
                : "border border-[#C9A96E]/40 text-[#8B7D72] hover:bg-[#C9A96E]/5"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryId(cat.id)}
              className={`px-5 py-2 rounded-full font-sans text-[10px] tracking-wider uppercase transition-all whitespace-nowrap ${
                categoryId === cat.id
                  ? "bg-[#C9A96E] font-bold text-[#1A1410]"
                  : "border border-[#C9A96E]/40 text-[#8B7D72] hover:bg-[#C9A96E]/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {isSpinning ? (
          <Skeleton />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h2 className="font-serif italic text-2xl text-[#1e1b15] mb-4">No products found</h2>
            <button
              onClick={() => setCategoryId(undefined)}
              className="font-sans text-[12px] font-bold text-[#C9A96E] uppercase tracking-widest hover:opacity-70 border-b border-[#C9A96E] pb-1"
            >
              View all products →
            </button>
          </div>
        ) : (
          <>
            <p className="font-sans text-[11px] text-[#8B7D72] tracking-wider mb-8">
              Showing {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: ProductListItem }) {
  const img = coverUrl(product);
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#EDE7DF] mb-4">
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[#C9A96E] text-5xl">chair</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/20 transition-all duration-500" />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-[#C9A96E] text-[#1A1410] font-sans text-[8px] tracking-wider uppercase px-2 py-1">
            Featured
          </span>
        )}
      </div>
      <div>
        {product.category && (
          <p className="font-sans text-[9px] text-[#C9A96E] uppercase tracking-widest mb-1">
            {product.category.name}
          </p>
        )}
        <h3 className="font-serif text-[15px] text-[#1e1b15] leading-snug mb-1 group-hover:text-[#745a27] transition-colors">
          {product.name}
        </h3>
        <p className="font-sans text-[11px] text-[#8B7D72]">
          {product.priceOnRequest ? "Price on Request" : product.price ?? "Price on Request"}
        </p>
      </div>
    </Link>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetCollectionsQuery, useGetCollectionProductsQuery } from "@/lib/store";
import type { CollectionProductItem } from "@/lib/types";

function ProductCard({ item }: { item: CollectionProductItem }) {
  const img = item.product.media?.[0]?.url ?? null;
  return (
    <Link href={`/products/${item.product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#2C2420] mb-4 rounded-sm">
        {img ? (
          <Image
            src={img}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C2420] to-[#1A1410]" />
        )}
        <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/30 transition-all duration-500" />
        {item.product.isFeatured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border border-[#C9A96E]/60 text-[#C9A96E] bg-[#1A1410]/70 rounded-sm">
            Featured
          </span>
        )}
      </div>
      <div className="px-1">
        <h3 className="font-serif text-[16px] text-[#1e1b15] group-hover:text-[#745a27] transition-colors leading-snug mb-0.5">
          {item.product.name}
        </h3>
        <p className="font-sans text-[9px] text-[#8B7D72] uppercase tracking-widest">
          {item.product.category?.name ?? "Luxury"}
        </p>
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-[#E8E0D5] rounded-sm mb-4" />
      <div className="h-4 w-3/4 bg-[#E8E0D5] rounded mb-2" />
      <div className="h-3 w-1/2 bg-[#E8E0D5] rounded" />
    </div>
  );
}

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;

  const { data: collectionsData, isLoading: loadingCollections } = useGetCollectionsQuery();
  const collection = collectionsData?.bySlug[slug];

  const { data: products, isLoading: loadingProducts } = useGetCollectionProductsQuery(
    collection?.id ?? "",
    { skip: !collection?.id },
  );

  const isLoading = loadingCollections || (!!collection && loadingProducts);

  if (loadingCollections) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fff8f1]">
        <div className="w-10 h-10 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    );
  }

  if (!collection) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center bg-[#fff8f1]">
        <h1 className="font-serif italic text-4xl text-[#1e1b15] mb-6">
          Collection Not Found
        </h1>
        <button
          onClick={() => router.push("/collections")}
          className="text-[#C9A96E] border-b border-[#C9A96E] pb-1 uppercase tracking-widest text-xs font-bold hover:text-[#745a27] transition-colors"
        >
          Explore All Collections →
        </button>
      </main>
    );
  }

  const items = products ?? [];

  return (
    <main className="min-h-screen bg-[#fff8f1]">
      {/* Hero */}
      <section className="bg-[#1A1410] relative overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col justify-end px-8 md:px-16 py-16 md:py-24">
        {collection.coverImageUrl && (
          <Image
            src={collection.coverImageUrl}
            alt={collection.name}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-[#1A1410]/70 to-transparent" />

        <div className="relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.3em] text-[#8B7D72] mb-6">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-[#C9A96E] transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-[#C9A96E]">{collection.name}</span>
          </nav>

          {collection.badgeText && (
            <span className="inline-block mb-3 px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-[#C9A96E]/50 text-[#C9A96E] rounded-sm">
              {collection.badgeText}
            </span>
          )}
          <h1 className="font-serif italic text-4xl md:text-6xl text-white leading-tight mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="font-sans text-[13px] text-white/50 max-w-lg leading-relaxed">
              {collection.description}
            </p>
          )}
          {items.length > 0 && (
            <p className="mt-4 font-sans text-[10px] text-[#C9A96E] uppercase tracking-[0.3em]">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-20">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <ProductSkeleton key={n} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-px bg-[#C9A96E]/30 mb-8" />
            <h3 className="font-serif italic text-2xl text-[#1e1b15] mb-3">
              No pieces in this collection yet
            </h3>
            <p className="font-sans text-sm text-[#8B7D72] mb-8">
              Our curation team is still assembling this collection.
            </p>
            <Link
              href="/collections"
              className="text-[#C9A96E] border-b border-[#C9A96E] pb-1 uppercase tracking-widest text-xs font-bold hover:text-[#745a27] transition-colors"
            >
              Explore Other Collections →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[...items]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((item) => (
                <ProductCard key={item.product.id} item={item} />
              ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1A1410] py-20 px-6 text-center border-t border-[#C9A96E]/10">
        <p className="font-sans text-[10px] text-[#C9A96E] uppercase tracking-[0.35em] mb-4">
          Discover More
        </p>
        <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-8">
          Explore the Full Catalogue
        </h2>
        <Link
          href="/collections"
          className="inline-block px-10 py-4 border border-[#C9A96E]/50 text-[#C9A96E] font-sans text-[11px] uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#1A1410] transition-all duration-300"
        >
          All Collections →
        </Link>
      </section>
    </main>
  );
}

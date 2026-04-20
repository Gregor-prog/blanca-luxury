"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
} from "@/lib/store";
import type { ProductDetail, ProductListItem } from "@/lib/types";

// ─── helpers ─────────────────────────────────────────────────────────────────

function allImages(product: ProductDetail): { url: string; alt: string }[] {
  return product.media
    .filter((m) => m.mediaType === "IMAGE")
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((m) => ({ url: m.url, alt: m.altText ?? product.name }));
}

function primaryImage(product: ProductListItem): string {
  const p = product.media.find((m) => m.isPrimary) ?? product.media[0];
  return p?.url ?? "/placeholder.jpg";
}

// ─── loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <main className="pt-24 min-h-screen bg-[#fff8f1] animate-pulse">
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-6rem)]">
        <div className="w-full md:w-[55%] h-[80vh] bg-linear-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-size-[200%_100%] animate-[shimmer_2s_infinite]" />
        <div className="w-full md:w-[45%] p-12 md:p-20">
          <div className="h-4 w-32 bg-[#E8E0D5] rounded mb-8" />
          <div className="h-6 w-24 bg-[#E8E0D5] rounded-full mb-6" />
          <div className="h-16 w-3/4 bg-[#E8E0D5] rounded mb-4" />
          <div className="h-4 w-1/2 bg-[#E8E0D5] rounded mb-12" />
          <div className="grid grid-cols-2 gap-8 mb-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-12 bg-[#E8E0D5] rounded" />
            ))}
          </div>
          <div className="font-sans text-[11px] text-[#C9A96E] italic">
            Curating your collection…
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  // Related products: only run once we know the category
  const { data: relatedData } = useGetRelatedProductsQuery(
    { categoryId: product?.category?.id ?? "", excludeId: id },
    { skip: !product?.category?.id },
  );

  const related = relatedData?.items ?? [];

  if (isLoading) return <LoadingSkeleton />;

  if (isError || !product) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center bg-[#fff8f1]">
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
        <h1 className="font-serif italic text-4xl text-[#1e1b15] mb-6">
          Piece Not Found
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

  const images = allImages(product);
  const displayImages =
    images.length > 0
      ? images
      : [{ url: "/placeholder.jpg", alt: product.name }];

  const handleWhatsApp = () => {
    const currentUrl = window.location.href;
    const text = encodeURIComponent(
      `Hi, I'd like to inquire about ${product.name}\n\n${currentUrl}`,
    );
    window.open(`https://wa.me/2348139910974?text=${text}`, "_blank");
  };

  const formatPrice = () => {
    if (product.priceOnRequest || !product.price) return "Price on Request";
    return `$${Number(product.price).toLocaleString()}`;
  };

  return (
    <main className="pt-24 min-h-screen bg-[#fff8f1]">
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-6rem)]">

        {/* LEFT — IMAGE GALLERY */}
        <div className="w-full md:w-[55%] flex flex-col">
          <div className="grow overflow-hidden bg-surface-container-low relative min-h-[50vh] md:min-h-full">
            <img
              alt={displayImages[activeImageIndex]?.alt}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
              src={displayImages[activeImageIndex]?.url}
            />
          </div>
          {/* Thumbnail strip */}
          {displayImages.length > 1 && (
            <div className="flex gap-4 p-8 bg-[#fff8f1] overflow-x-auto no-scrollbar">
              {displayImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 min-w-20 p-1 cursor-pointer transition-colors border-2 ${activeImageIndex === idx ? "border-[#C9A96E]" : "border-transparent hover:border-outline-variant"}`}
                >
                  <img
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    src={img.url}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div className="w-full md:w-[45%] p-12 md:p-20 md:sticky md:top-24 h-fit">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] uppercase text-secondary font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link
              href="/collections"
              className="hover:text-[#745a27] transition-colors"
            >
              Collections
            </Link>
            <span className="text-outline-variant">/</span>
            {product.category && (
              <>
                <span>{product.category.name}</span>
                <span className="text-outline-variant">/</span>
              </>
            )}
            <span className="text-[#1e1b15] truncate">{product.name}</span>
          </nav>

          {/* Category badge */}
          <div className="inline-block px-4 py-1.5 border border-primary-container rounded-full text-[10px] tracking-[0.2em] text-[#745a27] font-bold mb-6">
            {product.category?.name ?? "Luxury"} · {product.origin}
          </div>

          {/* Name */}
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#2C2420] font-light leading-tight mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <p className="font-serif text-2xl text-[#C9A96E] mb-6">
            {formatPrice()}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 pb-12 border-b border-outline-variant/40">
            {product.materials && (
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase mb-2">
                  Material
                </h4>
                <p className="font-sans text-sm text-[#1e1b15]">
                  {product.materials}
                </p>
              </div>
            )}
            {product.dimensions && (
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase mb-2">
                  Dimensions
                </h4>
                <p className="font-sans text-sm text-[#1e1b15]">
                  {product.dimensions}
                </p>
              </div>
            )}
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase mb-2">
                Origin
              </h4>
              <p className="font-sans text-sm text-[#1e1b15]">
                {product.origin}
              </p>
            </div>
            {product.leadTime && (
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase mb-2">
                  Lead Time
                </h4>
                <p className="font-sans text-sm text-[#1e1b15]">
                  {product.leadTime}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="font-serif text-xl text-[#2C2420] leading-relaxed mb-12 max-w-prose">
              {product.description}
            </div>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {product.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 border border-[#C9A96E]/30 rounded-full text-[10px] text-secondary tracking-widest uppercase"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-6">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#1E1B15] text-[#C9A96E] py-5 rounded-full font-sans font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex justify-center items-center gap-3"
            >
              Inquire on WhatsApp
            </button>
            <div className="flex flex-col gap-4 items-start">
              <div className="relative group">
                <button className="flex items-center gap-2 text-secondary text-xs uppercase tracking-widest hover:text-[#1e1b15] transition-colors font-sans py-2">
                  Schedule a Showroom Visit
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl py-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10">
                  <a
                    className="block px-6 py-2 hover:bg-surface-container-low font-sans text-xs uppercase tracking-widest text-[#1e1b15] transition-colors"
                    href="#"
                  >
                    Lagos
                  </a>
                  <a
                    className="block px-6 py-2 hover:bg-surface-container-low font-sans text-xs uppercase tracking-widest text-[#1e1b15] transition-colors"
                    href="#"
                  >
                    Port Harcourt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-32 bg-[#fbf2e7]">
          <h2 className="font-serif text-4xl text-[#2C2420] mb-16 tracking-widest text-center uppercase">
            You May Also Love
          </h2>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 scroll-smooth">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/collections/${item.id}`)}
                className="min-w-[80vw] sm:min-w-65 md:min-w-75 w-[80vw] sm:w-70 md:w-80 bg-white p-6 md:p-8 rounded-lg group cursor-pointer transition-transform duration-500 hover:-translate-y-2 shrink-0"
              >
                <div className="aspect-4/5 overflow-hidden mb-6 bg-[#fff8f1]">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={primaryImage(item)}
                  />
                </div>
                <h3 className="font-serif text-xl mb-1 uppercase tracking-widest text-[#1e1b15] truncate">
                  {item.name}
                </h3>
                <p className="text-[#C9A96E] font-sans text-xs font-bold tracking-widest uppercase">
                  {item.category?.name ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

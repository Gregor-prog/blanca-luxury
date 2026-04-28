"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/lib/store";
import type { ProductListItem } from "@/lib/types";

function coverUrl(p: ProductListItem) {
  return p.media.find((m) => m.isPrimary)?.url ?? p.media[0]?.url ?? null;
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="aspect-[3/4] bg-[#ede7df] rounded-sm mb-3" />
          <div className="h-3 w-24 bg-[#ede7df] rounded mb-2" />
          <div className="h-4 w-36 bg-[#ede7df] rounded" />
        </div>
      ))}
    </div>
  );
}

export function ProductsTeaser() {
  const { data, isLoading } = useGetProductsQuery({ limit: 4, isFeatured: true });
  const products = data?.items ?? [];

  return (
    <section className="bg-[#FAF8F5] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] text-[#745a27] tracking-[0.35em] uppercase mb-4">
            FEATURED PIECES
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#1e1b15] leading-tight">
            View Our Products
          </h2>
        </div>
        <Link
          href="/products"
          className="font-sans text-[11px] text-[#745a27] tracking-widest uppercase border-b border-[#745a27]/50 pb-1 hover:opacity-70 transition-opacity whitespace-nowrap self-end"
        >
          See All Products →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
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
            <span className="material-symbols-outlined text-[#C9A96E] text-4xl">chair</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/30 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <span className="font-sans text-[10px] text-white tracking-widest uppercase">
            View Details →
          </span>
        </div>
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

function EmptyProducts() {
  return (
    <div className="text-center py-16">
      <p className="font-serif italic text-2xl text-[#8B7D72] mb-6">
        Our catalogue is being curated
      </p>
      <Link
        href="/contact"
        className="font-sans text-[11px] text-[#745a27] uppercase tracking-widest border-b border-[#745a27]/50 pb-1"
      >
        Contact for bespoke enquiries →
      </Link>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category, Product, fetchProducts } from "../../lib/api";

const CATEGORIES: Category[] = ["ALL", "FURNITURE", "DECOR", "DRAPERY", "FRAGRANCES", "OFFICE"];

export default function CollectionsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProducts(activeCategory).then((data) => {
      if (isMounted) {
        setProducts(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

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
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-sans text-[10px] font-bold tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#C9A96E] text-[#1A1410] border border-[#C9A96E]"
                  : "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1410]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-24 z-40 bg-[#FAF8F5] border-b border-[#E8E0D5] py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-[12px] font-sans text-[#695c52] tracking-wide">
          Showing: <span className="font-bold text-[#1e1b15]">{activeCategory === "ALL" ? "All Products" : activeCategory} ({isLoading ? "-" : products.length})</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <span className="text-[12px] font-sans text-[#695c52] tracking-wide flex items-center gap-2">
              Sort by: <span className="text-[#1e1b15] font-medium">Featured</span>
              <span className="material-symbols-outlined text-[16px]" data-icon="expand_more">expand_more</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#695c52]">
            <span 
              className={`material-symbols-outlined cursor-pointer hover:text-[#745a27] transition-colors ${viewMode === 'grid' ? "text-[#745a27]" : ""}`} 
              onClick={() => setViewMode('grid')}
              style={{ fontVariationSettings: viewMode === 'grid' ? "'FILL' 1" : "'FILL' 0" }}
            >
              grid_view
            </span>
            <span 
              className={`material-symbols-outlined cursor-pointer hover:text-[#745a27] transition-colors ${viewMode === 'list' ? "text-[#745a27]" : ""}`}
              onClick={() => setViewMode('list')}
              style={{ fontVariationSettings: viewMode === 'list' ? "'FILL' 1" : "'FILL' 0" }}
            >
              view_list
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <section className="max-w-[1440px] mx-auto py-16 px-6 md:px-12">
        {isLoading ? (
          <div className={`grid grid-cols-1 ${viewMode === 'list' ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-x-8 gap-y-12`}>
            {/* Loading Skeletons */}
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="flex flex-col gap-6 animate-pulse">
                <div className="aspect-[4/3] rounded-[4px] bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
                <div className="space-y-3 px-2">
                  <div className="h-2 w-16 bg-[#E8E0D5] rounded"></div>
                  <div className="h-4 w-48 bg-[#E8E0D5] rounded"></div>
                  <div className="h-2 w-32 bg-[#E8E0D5] rounded"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-4 w-12 bg-[#E8E0D5] rounded"></div>
                    <div className="font-sans text-[11px] text-[#C9A96E] italic">Curating your collection...</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="w-24 h-24 text-[#E8E0D5] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h2 className="font-serif text-[24px] italic text-[#1e1b15] mb-4">No pieces found in this category.</h2>
            <button 
              onClick={() => setActiveCategory('ALL')} 
              className="font-sans text-[12px] font-bold text-[#C9A96E] uppercase tracking-widest hover:text-[#745a27] transition-colors border-b border-[#C9A96E] pb-1"
            >
              Explore all collections →
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className={`grid grid-cols-1 ${viewMode === 'list' ? 'gap-y-12' : 'md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'}`}>
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => router.push(`/collections/${product.id}`)}
                className={`group bg-white rounded-[4px] overflow-hidden cursor-pointer transition-all duration-500 hover:ring-1 hover:ring-[#C9A96E]/30 ${viewMode === 'list' ? 'flex flex-row h-[240px]' : ''}`}
              >
                <div className={`${viewMode === 'list' ? 'w-1/3 h-full' : 'aspect-[4/3]'} overflow-hidden bg-[#f5ede2]`}>
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={product.imageUrl}
                  />
                </div>
                <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <div>
                    <span className="block font-sans text-[9px] text-[#C9A96E] font-bold tracking-[0.2em] mb-2 uppercase">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-[20px] text-[#1e1b15] mb-1">{product.name}</h3>
                    <p className="font-sans text-[11px] text-[#695c52] tracking-wide mb-4">{product.origin}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-[18px] text-[#1e1b15]">${product.price.toLocaleString()}</span>
                    <span className="font-sans text-[10px] font-bold text-[#1e1b15] uppercase tracking-widest border-b border-[#C9A96E] pb-1 hover:text-[#745a27] cursor-pointer transition-colors">
                      Inquire →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Area */}
        {!isLoading && products.length > 0 && (
          <div className="mt-24 flex flex-col items-center gap-6">
            <button className="w-full md:w-[240px] h-14 bg-[#1A1410] text-[#C9A96E] font-sans font-bold text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300">
                Load More
            </button>
            <p className="font-sans text-xs text-[#695c52] tracking-widest">Showing {products.length} of 42 pieces</p>
          </div>
        )}
      </section>
    </main>
  );
}

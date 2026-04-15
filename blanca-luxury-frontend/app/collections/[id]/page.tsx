"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, fetchProductById, fetchRelatedProducts } from "../../../lib/api";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      fetchProductById(id),
      fetchRelatedProducts(id)
    ]).then(([fetchedProduct, fetchedRelated]) => {
      if (isMounted) {
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setRelated(fetchedRelated);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="pt-24 min-h-screen bg-[#fff8f1] animate-pulse">
        <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-6rem)]">
          <div className="w-full md:w-[55%] h-[80vh] bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="w-full md:w-[45%] p-12 md:p-20">
            <div className="h-4 w-32 bg-[#E8E0D5] rounded mb-8"></div>
            <div className="h-6 w-24 bg-[#E8E0D5] rounded-full mb-6"></div>
            <div className="h-16 w-3/4 bg-[#E8E0D5] rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-[#E8E0D5] rounded mb-12"></div>
            <div className="grid grid-cols-2 gap-8 mb-12">
               <div className="h-12 bg-[#E8E0D5] rounded"></div>
               <div className="h-12 bg-[#E8E0D5] rounded"></div>
               <div className="h-12 bg-[#E8E0D5] rounded"></div>
               <div className="h-12 bg-[#E8E0D5] rounded"></div>
            </div>
            <div className="font-sans text-[11px] text-[#C9A96E] italic">Curating your collection...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center bg-[#fff8f1]">
        <svg className="w-24 h-24 text-[#E8E0D5] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <h1 className="font-serif italic text-4xl text-[#1e1b15] mb-6">Piece Not Found</h1>
        <button onClick={() => router.push('/collections')} className="text-[#C9A96E] border-b border-[#C9A96E] pb-1 uppercase tracking-widest text-xs font-bold hover:text-[#745a27] transition-colors">
          Explore All Collections →
        </button>
      </main>
    );
  }

  const handleWhatsApp = () => {
    // Current host url for sharing
    const currentUrl = window.location.href;
    const text = encodeURIComponent(`Hi, I'd like to inquire about ${product.name}\n\n${currentUrl}`);
    window.open(`https://wa.me/2348139910974?text=${text}`, '_blank');
  };

  return (
    <main className="pt-24 min-h-screen bg-[#fff8f1]">
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-6rem)]">
        
        {/* LEFT — IMAGE GALLERY (55%) */}
        <div className="w-full md:w-[55%] flex flex-col">
          <div className="flex-grow overflow-hidden bg-[#fbf2e7] relative min-h-[50vh] md:min-h-full">
            <img 
              alt={product.imageAlt} 
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500" 
              src={product.images[activeImageIndex]} 
            />
          </div>
          {/* Thumbnail Strip */}
          <div className="flex gap-4 p-8 bg-[#fff8f1] overflow-x-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 min-w-[5rem] p-1 cursor-pointer transition-colors border-2 ${activeImageIndex === idx ? 'border-[#C9A96E]' : 'border-transparent hover:border-[#d0c5b5]'}`}
              >
                <img 
                  alt={`${product.name} Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  src={img} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — PRODUCT INFO (45% sticky) */}
        <div className="w-full md:w-[45%] p-12 md:p-20 md:sticky md:top-24 h-fit">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] uppercase text-[#695c52] font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link href="/collections" className="hover:text-[#745a27] transition-colors">Collections</Link>
            <span className="text-[#d0c5b5]">/</span>
            <Link href="#" className="hover:text-[#745a27] transition-colors">{product.category}</Link>
            <span className="text-[#d0c5b5]">/</span>
            <span className="text-[#1e1b15] truncate">{product.name}</span>
          </nav>

          {/* Category Badge */}
          <div className="inline-block px-4 py-1.5 border border-[#c9a96e] rounded-full text-[10px] tracking-[0.2em] text-[#745a27] font-bold mb-6">
            {product.category} · ITALY
          </div>

          {/* Product Name & Tagline */}
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#2C2420] font-light leading-tight mb-4">
            {product.name}
          </h1>
          <p className="text-[#695c52] font-sans text-sm tracking-wide mb-12">
            {product.tagline}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 pb-12 border-b border-[#d0c5b5]/40">
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#695c52] uppercase mb-2">Material</h4>
              <p className="font-sans text-sm text-[#1e1b15]">{product.materials}</p>
            </div>
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#695c52] uppercase mb-2">Dimensions</h4>
              <p className="font-sans text-sm text-[#1e1b15]">{product.dimensions}</p>
            </div>
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#695c52] uppercase mb-2">Origin</h4>
              <p className="font-sans text-sm text-[#1e1b15]">{product.origin}</p>
            </div>
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#695c52] uppercase mb-2">Lead Time</h4>
              <p className="font-sans text-sm text-[#1e1b15]">{product.leadTime}</p>
            </div>
          </div>

          {/* Description */}
          <div className="font-serif text-xl text-[#2C2420] leading-relaxed mb-12 max-w-prose">
            {product.description}
          </div>

          {/* CTAs */}
          <div className="space-y-6">
            <button 
              onClick={handleWhatsApp}
              className="w-full bg-[#1E1B15] text-[#C9A96E] py-5 rounded-full font-sans font-bold tracking-[0.1em] uppercase hover:opacity-90 transition-opacity flex justify-center items-center gap-3"
            >
              Inquire on WhatsApp
            </button>
            <div className="flex flex-col gap-4 items-start">
              <button className="text-[#C9A96E] text-xs uppercase tracking-widest font-bold border-b border-[#C9A96E] pb-1 hover:opacity-70 transition-opacity font-sans">
                Request a Lookbook PDF →
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 text-[#695c52] text-xs uppercase tracking-widest hover:text-[#1e1b15] transition-colors font-sans py-2">
                  Schedule a Showroom Visit
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                {/* Dropdown Logic */}
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl py-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10">
                  <a className="block px-6 py-2 hover:bg-[#fbf2e7] font-sans text-xs uppercase tracking-widest text-[#1e1b15] transition-colors" href="#">Lagos</a>
                  <a className="block px-6 py-2 hover:bg-[#fbf2e7] font-sans text-xs uppercase tracking-widest text-[#1e1b15] transition-colors" href="#">Port Harcourt</a>
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
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 scroll-smooth">
            {related.map((item) => (
              <div 
                 key={item.id} 
                 onClick={() => router.push(`/collections/${item.id}`)}
                 className="min-w-[300px] w-[320px] bg-white p-8 rounded-lg group cursor-pointer transition-transform duration-500 hover:-translate-y-2 flex-shrink-0"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-[#fff8f1]">
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={item.imageUrl} 
                  />
                </div>
                <h3 className="font-serif text-xl mb-1 uppercase tracking-widest text-[#1e1b15] truncate">
                  {item.name}
                </h3>
                <p className="text-[#C9A96E] font-sans text-xs font-bold tracking-widest uppercase">
                  {item.category}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

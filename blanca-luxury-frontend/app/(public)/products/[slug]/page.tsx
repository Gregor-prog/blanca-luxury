'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useGetProductBySlugQuery } from '@/lib/store/productsApi';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#1A1410]">
        <div className="w-12 h-12 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#1A1410] text-center px-4">
        <h1 className="font-serif italic text-[32px] md:text-[48px] text-[#C9A96E] tracking-tighter mb-4">
          Product Not Found
        </h1>
        <p className="font-sans text-[12px] text-[#8B7D72] mb-8 max-w-md mx-auto leading-relaxed">
          The curated piece you are looking for does not exist or may have been removed from our catalog.
        </p>
        <button 
          onClick={() => router.back()} 
          className="px-8 py-3 bg-[#C9A96E] text-[#1A1410] text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Return to Gallery
        </button>
      </div>
    );
  }

  const primaryImage = product.media?.find(m => m.isPrimary)?.url || product.media?.[0]?.url || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop';
  const allImages = product.media?.map(m => m.url) || [primaryImage];
  const currentImage = allImages[activeImage] || primaryImage;

  return (
    <div className="min-h-screen bg-[#1A1410] pt-24 pb-24 border-t border-[#C9A96E]/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.3em] text-[#8B7D72] mb-12">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C9A96E] transition-colors">Gallery</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/collections/${product.category.slug}`} className="hover:text-[#C9A96E] transition-colors">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#C9A96E] truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#131210] group border border-[#C9A96E]/10">
              <Image 
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square overflow-hidden bg-[#131210] transition-all duration-300 ${activeImage === idx ? 'ring-1 ring-[#C9A96E] opacity-100' : 'opacity-50 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-4">
            <div className="mb-10">
              {product.category && (
                <span className="block font-sans text-[9px] text-[#C9A96E] tracking-[0.4em] uppercase mb-4">
                  {product.category.name}
                </span>
              )}
              <h1 className="font-serif italic text-[36px] md:text-[48px] text-white leading-[1.1] mb-6">
                {product.name}
              </h1>
              
              <div className="w-10 h-px bg-[#C9A96E]/50 mb-6" />

              <div className="font-sans text-[12px] tracking-widest text-[#8B7D72] uppercase mb-8">
                {product.priceOnRequest ? (
                  <span>Price on Request</span>
                ) : product.price ? (
                  <span>₦ {Number(product.price).toLocaleString()}</span>
                ) : (
                  <span>Contact for Pricing</span>
                )}
              </div>
            </div>

            <div className="font-sans text-[12px] leading-relaxed text-[#8B7D72]/80 space-y-4 mb-12">
              <p>{product.description || 'Detailed specifications are available upon consultation with our curation team.'}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-12 py-8 border-y border-[#C9A96E]/10">
              {product.style && (
                <div>
                  <h4 className="font-sans text-[9px] text-[#C9A96E] tracking-[0.3em] uppercase mb-2">Style</h4>
                  <p className="font-sans text-[11px] text-white/80">{product.style}</p>
                </div>
              )}
              {product.materials && (
                <div>
                  <h4 className="font-sans text-[9px] text-[#C9A96E] tracking-[0.3em] uppercase mb-2">Materials</h4>
                  <p className="font-sans text-[11px] text-white/80">{product.materials}</p>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <h4 className="font-sans text-[9px] text-[#C9A96E] tracking-[0.3em] uppercase mb-2">Dimensions</h4>
                  <p className="font-sans text-[11px] text-white/80">{product.dimensions}</p>
                </div>
              )}
              {product.origin && (
                <div>
                  <h4 className="font-sans text-[9px] text-[#C9A96E] tracking-[0.3em] uppercase mb-2">Origin</h4>
                  <p className="font-sans text-[11px] text-white/80 capitalize">{product.origin.toLowerCase()}</p>
                </div>
              )}
            </div>

            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/2348139910974?text=${encodeURIComponent(`Hello Blanca Luxury, I am inquiring about this piece:\n\n*${product.name}*\nLink: https://blancaluxury.com/products/${product.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#C9A96E] text-[#1A1410] font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#b5955a] transition-colors"
              >
                Inquire About This Piece
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              {product.showroom && (
                <p className="text-center font-sans text-[9px] text-[#8B7D72] uppercase tracking-[0.3em] mt-6">
                  Available for viewing at <br/> <span className="text-[#C9A96E]">{product.showroom.city}</span> Showroom
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

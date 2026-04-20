'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CollectionProps {
  id: string;
  name: string;
  slug: string;
  status: 'Live' | 'Draft' | 'Archived';
  year: string;
  showroom: string;
  description: string;
  productCount: number;
  viewCount: number;
  isFeatured: boolean;
  coverImage: string;
}

export function CollectionCard({ collection }: { collection: CollectionProps }) {
  return (
    <article className="bg-[#1A1916] border border-admin-border rounded-[8px] overflow-hidden group hover:border-admin-gold/30 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Area */}
      <div className="h-[160px] relative overflow-hidden">
        <Image 
          src={collection.coverImage} 
          alt={collection.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1916] via-transparent to-transparent opacity-60"></div>
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-widest ${
          collection.status === 'Live' ? 'bg-admin-gold text-admin-bg' : 
          collection.status === 'Draft' ? 'bg-[#2E2C28] text-admin-text-secondary' : 
          'bg-admin-danger/20 text-admin-danger border border-admin-danger/30'
        }`}>
          {collection.status}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[15px] font-medium text-[#F0EDE8] tracking-tight group-hover:text-admin-gold transition-colors">{collection.name}</h3>
          <button className="text-admin-text-muted hover:text-admin-gold transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="bg-[#2E2C28] text-[#8B8680] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {collection.year}
          </span>
          <span className="border border-admin-gold/30 text-admin-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {collection.showroom}
          </span>
        </div>

        <p className="text-[12px] text-[#8B8680] leading-relaxed mb-6 line-clamp-2">
          {collection.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2E2C28]">
          <div className="flex items-center gap-4 text-[11px] text-[#8B8680]">
            <span className="flex items-center gap-1.5 font-medium">
              <strong className="text-admin-text-primary">{collection.productCount}</strong> Products
            </span>
            <span className="w-1 h-1 rounded-full bg-[#2E2C28]"></span>
            <span className="font-medium">
              <strong className="text-admin-text-primary">{collection.viewCount.toLocaleString()}</strong> views
            </span>
          </div>
          
          {collection.isFeatured && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-admin-gold shadow-[0_0_8px_rgba(201,169,110,0.6)] animate-pulse"></span>
              <span className="text-[11px] font-bold text-admin-gold uppercase tracking-tighter">Featured</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions Row */}
      <div className="bg-[#1D1B19]/50 px-6 py-3 border-t border-[#2E2C28] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-[11px] font-bold text-admin-gold uppercase tracking-wider hover:opacity-80">Edit</button>
        </div>
        <Link 
          href={`/admin/collections/${collection.id}/products`}
          className="text-[11px] font-bold text-admin-text-primary uppercase tracking-wider flex items-center gap-1 hover:text-admin-gold transition-colors group-actions"
        >
          Manage Products <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}

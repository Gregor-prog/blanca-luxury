'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Collection } from '@/lib/types';

interface CollectionCardProps {
  collection: Collection;
  onEdit?: (c: Collection) => void;
}

export function CollectionCard({ collection, onEdit }: CollectionCardProps) {
  const status = collection.isActive ? 'Live' : 'Draft';

  return (
    <article className="bg-[#1A1916] border border-admin-border rounded-[8px] overflow-hidden group hover:border-admin-gold/30 transition-all duration-300 flex flex-col h-full shadow-xl">
      {/* Cover Image Area */}
      <div className="h-[160px] relative overflow-hidden">
        <Image 
          src={collection.coverImageUrl ?? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop'} 
          alt={collection.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1916] via-transparent to-transparent opacity-60"></div>
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-widest ${
          status === 'Live' ? 'bg-admin-gold text-admin-bg' : 'bg-[#2E2C28] text-admin-text-secondary'
        }`}>
          {status}
        </div>

        {/* Badge Text */}
        {collection.badgeText && (
          <div className="absolute top-4 left-4 bg-admin-bg/80 border border-admin-gold/30 text-admin-gold px-2.5 py-1 rounded-[2px] text-[9px] font-bold uppercase tracking-widest">
            {collection.badgeText}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[15px] font-bold text-[#F0EDE8] tracking-tight group-hover:text-admin-gold transition-colors">
            {collection.name}
          </h3>
        </div>

        <div className="flex gap-2 mb-4">
          {collection.year && (
            <span className="bg-[#2E2C28] text-[#8B8680] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              {collection.year}
            </span>
          )}
          {collection.showroom && (
            <span className="border border-admin-gold/30 text-admin-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              {collection.showroom.city}
            </span>
          )}
        </div>

        <p className="text-[12px] text-[#8B8680] leading-relaxed mb-6 line-clamp-2">
          {collection.description || 'No editorial summary provided.'}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2E2C28]">
          <div className="flex items-center gap-4 text-[11px] text-[#8B8680]">
            <span className="flex items-center gap-1.5 font-medium">
              <strong className="text-admin-text-primary">{collection._count?.products ?? 0}</strong> Products
            </span>
          </div>
          
          {collection.isFeatured && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-admin-gold shadow-[0_0_8px_rgba(201,169,110,0.6)] animate-pulse"></span>
              <span className="text-[11px] font-bold text-admin-gold uppercase tracking-widest text-[9px]">Featured</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions Row */}
      <div className="bg-[#1D1B19]/50 px-6 py-3 border-t border-[#2E2C28] flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onEdit && (
            <button 
              onClick={() => onEdit(collection)}
              className="text-[11px] font-bold text-admin-gold uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Edit
            </button>
          )}
        </div>
        <Link 
          href={`/admin/collections/${collection.id}/products`}
          className="text-[11px] font-bold text-admin-text-primary uppercase tracking-wider flex items-center gap-1 hover:text-admin-gold transition-colors group"
        >
          Manage Products 
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}


'use client';

import React from 'react';
import Image from 'next/image';

interface ProductRowProps {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  showroom: string;
  origin: string;
  originFlag: string;
  status: 'Active' | 'Draft' | 'Inactive';
  isFeatured: boolean;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export function ProductRow({ product }: { product: ProductRowProps }) {
  return (
    <div 
      className={`admin-table-row flex items-center px-4 relative group ${product.isSelected ? 'bg-admin-surface-elevated border-l-[3px] border-admin-gold transition-all' : ''}`}
    >
      <div className="flex items-center w-12">
        <input 
          type="checkbox" 
          checked={product.isSelected}
          onChange={() => product.onToggleSelection(product.id)}
          className="w-4 h-4 rounded-[2px] border-admin-border bg-admin-surface text-admin-gold focus:ring-1 focus:ring-admin-gold cursor-pointer"
        />
      </div>
      
      <div className="w-16">
        <div className="w-9 h-9 rounded-[4px] overflow-hidden bg-admin-surface border border-admin-border/30 relative">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-[200px]">
        <p className="text-[13px] font-medium text-admin-text-primary">{product.name}</p>
        <p className="text-[11px] text-admin-text-muted mt-0.5 uppercase tracking-wider">SKU: {product.sku}</p>
      </div>

      <div className="flex-1">
        <span className="text-admin-text-secondary">{product.category}</span>
      </div>

      <div className="flex-1">
        <span className="bg-admin-border/20 text-admin-text-secondary px-2.5 py-1 rounded-full text-[11px] font-medium">
          {product.showroom}
        </span>
      </div>

      <div className="flex-1">
        <span className="text-admin-text-secondary flex items-center gap-1.5">
          <span>{product.originFlag}</span>
          {product.origin}
        </span>
      </div>

      <div className="w-24 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${
          product.status === 'Active' ? 'bg-admin-success' : 
          product.status === 'Draft' ? 'bg-admin-text-muted' : 'bg-admin-danger'
        } ${product.status !== 'Draft' ? 'shadow-[0_0_8px_rgba(76,175,125,0.4)]' : ''}`}></span>
        <span className={`text-[12px] font-medium ${
          product.status === 'Active' ? 'text-admin-success' : 
          product.status === 'Draft' ? 'text-admin-text-muted' : 'text-admin-danger'
        }`}>
          {product.status}
        </span>
      </div>

      <div className="w-16 text-center">
        <button 
          onClick={() => product.onToggleFeatured(product.id)}
          className={`material-symbols-outlined text-[18px] transition-colors ${product.isFeatured ? 'text-admin-gold' : 'text-admin-text-muted hover:text-admin-gold'}`}
          style={{ fontVariationSettings: product.isFeatured ? "'FILL' 1" : undefined }}
        >
          star
        </button>
      </div>

      <div className="w-12 text-right">
        <button className="text-admin-text-muted hover:text-admin-gold transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
    </div>
  );
}

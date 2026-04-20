'use client';

import React from 'react';
import { ProductForm } from '@/components/admin/form/ProductForm';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      {/* Topbar Component */}
      <header className="sticky top-0 z-40 h-[64px] mb-10 flex items-center justify-between border-b border-admin-border/20 bg-admin-bg/90 backdrop-blur-xl px-4 -mx-4 transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-admin-text-muted hover:text-admin-gold transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Link href="/admin/products" className="text-admin-text-muted hover:text-admin-gold">Products</Link>
            <span className="material-symbols-outlined text-[14px] text-admin-text-muted">chevron_right</span>
            <span className="text-admin-gold">Add New Product</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#8B8680] hover:text-admin-gold transition-colors">Save Draft</button>
           <button className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[6px] text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">Publish</button>
        </div>
      </header>

      <ProductForm mode="add" />
    </div>
  );
}

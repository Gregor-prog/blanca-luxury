'use client';

import React from 'react';
import { ProductForm } from '@/components/admin/form/ProductForm';
import Link from 'next/link';

export default function EditProductPage() {
  // Mock initial data for the "Obsidian Lounge Chair"
  const mockupData = {
    name: 'Obsidian Lounge Chair',
    slug: 'obsidian-lounge-chair',
    description: "A masterclass in restraint. The Obsidian Lounge Chair pairs hand-charred oak with supple aniline leather. Its low profile and deep seat invite contemplation, making it an anchor piece for any sophisticated living space. Each piece is unique, bearing the subtle marks of the artisan's hand.",
    style: 'Minimalist',
    type: 'Seating',
    origin: 'Milan, Italy',
    materials: 'Charred Oak, Aniline Leather',
    dimensions: '85cm x 92cm x 76cm',
    leadTime: '8-12 Weeks (Made to Order)',
    price: '4,250,000',
    isPriceOnRequest: true,
    status: 'Draft',
    isFeatured: false,
    category: 'Seating',
    showroom: 'Manhattan Flagship (Floor 2)',
    collection: 'Obsidian Foundation',
    tags: ['Lounge', 'Leather', 'Dark Wood'],
    metaTitle: 'Edit Masterpiece - BLANCA Admin',
    metaDescription: 'Luxury charcoal lounge chair featuring charred oak and aniline leather.',
    seoKeywords: ['Obsidian', 'Lounge', 'Luxury Furniture']
  };

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
            <span className="text-admin-gold">Edit Masterpiece</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 border-r border-admin-border/20 pr-6 mr-2">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-admin-text-muted hover:text-admin-gold">Inventory</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-admin-text-muted hover:text-admin-gold">Furniture</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-admin-gold border-b border-admin-gold pb-1">Edit Piece</a>
          </nav>

          <div className="flex items-center gap-3">
             <button className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-admin-text-muted border border-admin-border/50 rounded-[4px] hover:text-admin-gold transition-colors">Save Draft</button>
             <button className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[6px] text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">Publish Changes</button>
          </div>

          <div className="flex items-center gap-2 border-l border-admin-border/20 pl-4">
             {['history', 'visibility', 'more_vert'].map(icon => (
               <button key={icon} className="text-admin-text-muted hover:text-admin-gold transition-colors">
                 <span className="material-symbols-outlined text-[20px]">{icon}</span>
               </button>
             ))}
          </div>
        </div>
      </header>

      <ProductForm mode="edit" initialData={mockupData} />
    </div>
  );
}

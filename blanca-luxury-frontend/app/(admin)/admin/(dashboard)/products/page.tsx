'use client';

import React, { useState } from 'react';
import { ProductFilterBar } from '@/components/admin/ProductFilterBar';
import { ProductRow } from '@/components/admin/ProductRow';
import { BatchActionBar } from '@/components/admin/BatchActionBar';

const initialProducts = [
  {
    id: '1',
    name: 'Obsidian Nero Marquina',
    sku: 'NM-8492-OB',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=300&auto=format&fit=crop',
    category: 'Slabs',
    showroom: 'Milano Flagship',
    origin: 'Italy',
    originFlag: '🇮🇹',
    status: 'Active' as const,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Silver Travertine Classic',
    sku: 'TR-1102-SL',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop',
    category: 'Tiles',
    showroom: 'London Gallery',
    origin: 'Turkey',
    originFlag: '🇹🇷',
    status: 'Draft' as const,
    isFeatured: false,
  },
  {
    id: '3',
    name: 'Calacatta Borghini',
    sku: 'CB-9921-WH',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=300&auto=format&fit=crop',
    category: 'Slabs',
    showroom: 'New York',
    origin: 'Italy',
    originFlag: '🇮🇹',
    status: 'Inactive' as const,
    isFeatured: false,
  },
  {
    id: '4',
    name: 'Onyx Ivory Light',
    sku: 'OX-3321-IV',
    image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=300&auto=format&fit=crop',
    category: 'Accents',
    showroom: 'Paris',
    origin: 'Iran',
    originFlag: '🇮🇷',
    status: 'Active' as const,
    isFeatured: false,
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const isAllSelected = selectedIds.length === products.length && products.length > 0;
  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary">Products</h2>
          <span className="bg-admin-surface border border-admin-border px-2 py-0.5 rounded-[4px] text-admin-text-secondary text-[12px] font-bold">
            142
          </span>
        </div>
        <button className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2">
          Add Product
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Filter Bar */}
      <ProductFilterBar />

      {/* Table Container */}
      <div className="bg-admin-surface border border-admin-border rounded-[8px] overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="h-[44px] bg-admin-surface-elevated/20 flex items-center px-4 border-b border-admin-border">
          <div className="flex items-center w-12 text-left">
            <input 
              type="checkbox" 
              checked={isAllSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded-[2px] border-admin-border bg-admin-surface text-admin-gold focus:ring-1 focus:ring-admin-gold cursor-pointer"
            />
          </div>
          <div className="w-16 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Image</div>
          <div className="flex-1 min-w-[200px] text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Product Name</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Category</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Showroom</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Origin</div>
          <div className="w-24 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Status</div>
          <div className="w-16 text-center text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Featured</div>
          <div className="w-12 text-right text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-admin-border/10">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductRow 
                key={product.id}
                product={{
                  ...product,
                  isSelected: selectedIds.includes(product.id),
                  onToggleSelection: toggleSelection,
                  onToggleFeatured: toggleFeatured
                }}
              />
            ))
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">inventory_2</span>
              <p className="text-[14px] text-admin-text-secondary font-medium">No products match your filters.</p>
              <button className="text-admin-gold text-[12px] font-bold uppercase mt-2 hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between pb-24">
        <p className="text-[12px] text-admin-text-secondary">Showing 1–24 of 142 products</p>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-admin-gold text-admin-bg font-bold text-[13px]">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors text-[13px]">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors text-[13px]">3</button>
          <span className="text-admin-text-muted px-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors text-[13px]">6</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Batch Action Bar */}
      <BatchActionBar selectedCount={selectedIds.length} />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const mockCurrentProducts = [
  { id: '1', name: 'Nero Bouclé Lounge Chair', sku: 'NR-LC-01', category: 'Seating', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'Obsidian Vessel III', sku: 'OB-VS-03', category: 'Decor', image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=200&auto=format&fit=crop' },
  { id: '3', name: 'Tenebris Coffee Table', sku: 'TN-CT-02', category: 'Tables', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200&auto=format&fit=crop' },
  { id: '4', name: 'Aura Floor Lamp', sku: 'AU-FL-04', category: 'Lighting', image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=200&auto=format&fit=crop' }
];

const mockInventory = [
  { id: '5', name: 'Chromium Club Chair', category: 'Seating', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=200&auto=format&fit=crop' },
  { id: '6', name: 'Linen Throw Cushion', category: 'Textiles', image: 'https://images.unsplash.com/photo-1571508601891-ca5c7a71ad5f?q=80&w=200&auto=format&fit=crop' },
  { id: '7', name: 'Monolith Dining Table', category: 'Tables', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=200&auto=format&fit=crop' }
];

export default function ManageCollectionProductsPage() {
  const [currentProducts, setCurrentProducts] = useState(mockCurrentProducts);
  const [inventory, setInventory] = useState(mockInventory);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...currentProducts];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setCurrentProducts(newItems);
  };

  const moveDown = (index: number) => {
    if (index === currentProducts.length - 1) return;
    const newItems = [...currentProducts];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setCurrentProducts(newItems);
  };

  const removeItem = (id: string) => {
    const item = currentProducts.find(p => p.id === id);
    if (item) {
      setCurrentProducts(currentProducts.filter(p => p.id !== id));
      setInventory([...inventory, { id: item.id, name: item.name, category: item.category, image: item.image }]);
    }
  };

  const addItem = (id: string) => {
    const item = inventory.find(p => p.id === id);
    if (item) {
      setInventory(inventory.filter(p => p.id !== id));
      setCurrentProducts([...currentProducts, { id: item.id, name: item.name, sku: 'SKU-NEW', category: item.category, image: item.image }]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* Header - No sticky here to avoid clashing with global Topbar, or use fixed with offset */}
      <header className="flex justify-between items-center px-4 h-[72px] bg-admin-surface border border-admin-border/50 rounded-[8px] mb-10">
        <div className="flex items-center gap-6 pl-4">
          <Link href="/admin/collections" className="text-admin-text-muted hover:text-admin-gold transition-colors flex items-center justify-center p-2 -ml-2 rounded hover:bg-admin-surface-elevated">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Manage Collection Products</h1>
            <p className="text-[11px] font-medium text-admin-gold tracking-[0.05em] uppercase mt-0.5">The Obsidian Collection</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <Link href="/admin/collections" className="px-5 py-2 rounded border border-admin-border/50 text-admin-text-primary text-[12px] font-bold uppercase tracking-widest hover:bg-admin-surface-elevated transition-colors">
            Cancel
          </Link>
          <button className="bg-admin-gold text-admin-bg text-[12px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-[6px] hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Changes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1600px] mx-auto pb-24">
        {/* Left Column: Current Products */}
        <section className="flex flex-col">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-admin-border/20">
            <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Products in this Collection</h2>
            <span className="text-[11px] font-bold text-admin-text-muted uppercase tracking-[0.08em] bg-admin-surface-elevated px-3 py-1 rounded-[4px]">
              {currentProducts.length} Items
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {currentProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className="group flex items-center gap-5 p-4 rounded-[8px] bg-admin-surface border border-admin-border/50 hover:border-admin-gold/30 transition-all relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-admin-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Reorder Controls */}
                <div className="flex flex-col gap-1 items-center">
                  <button onClick={() => moveUp(idx)} className="text-admin-text-muted hover:text-admin-gold transition-colors p-0.5 disabled:opacity-20" disabled={idx === 0}>
                    <span className="material-symbols-outlined text-[18px]">expand_less</span>
                  </button>
                  <button onClick={() => moveDown(idx)} className="text-admin-text-muted hover:text-admin-gold transition-colors p-0.5 disabled:opacity-20" disabled={idx === currentProducts.length - 1}>
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>
                </div>

                <div className="relative w-16 h-16 rounded-[4px] overflow-hidden bg-admin-bg flex-shrink-0">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-admin-text-primary truncate">{product.name}</h3>
                  <p className="text-[11px] text-admin-text-muted mt-1 uppercase tracking-wider">{product.category} • {product.sku}</p>
                </div>

                <button 
                  onClick={() => removeItem(product.id)}
                  className="text-admin-text-muted hover:text-admin-danger transition-colors p-2 rounded hover:bg-admin-danger/10"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Add Products */}
        <section className="flex flex-col border-l border-admin-border/10 pl-16">
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight mb-8">Add Products</h2>
          
          {/* Search Input */}
          <div className="relative mb-8">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-muted text-[18px]">search</span>
            <input 
              className="w-full bg-admin-surface border border-admin-border/50 text-admin-text-primary rounded-[6px] pl-12 pr-4 py-3 focus:outline-none focus:border-admin-gold transition-colors placeholder:text-admin-text-muted text-[13px]" 
              placeholder="Search inventory..." 
              type="text"
            />
          </div>

          {/* Inventory Results */}
          <div className="flex flex-col rounded-[8px] overflow-hidden border border-admin-border/50 divide-y divide-admin-border/30">
            {inventory.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-admin-surface transition-colors group">
                <div className="w-12 h-12 rounded-[4px] overflow-hidden bg-admin-bg flex-shrink-0 relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 relative" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-admin-text-primary truncate">{item.name}</h3>
                  <p className="text-[11px] text-admin-text-muted mt-0.5 uppercase tracking-wider font-medium">{item.category}</p>
                </div>
                <button 
                  onClick={() => addItem(item.id)}
                  className="px-4 py-1.5 rounded-[4px] border border-admin-gold/30 text-admin-gold text-[11px] font-bold uppercase tracking-widest hover:bg-admin-gold hover:text-admin-bg transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Add
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

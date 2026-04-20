'use client';

import React, { useState } from 'react';
import { CollectionCard } from '@/components/admin/CollectionCard';
import { AddCollectionPanel } from '@/components/admin/AddCollectionPanel';

const initialCollections = [
  {
    id: '1',
    name: 'The Obsidian Line',
    slug: 'the-obsidian-line',
    status: 'Live' as const,
    year: '2024',
    showroom: 'Milan Showroom',
    description: 'Our flagship collection exploring the intersection of brutalist forms and delicate material finishes. Featuring deep tones and structural integrity.',
    productCount: 12,
    viewCount: 8420,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Lumina Series',
    slug: 'lumina-series',
    status: 'Live' as const,
    year: '2023',
    showroom: 'Milan',
    description: 'A study in light and transparency. Soft curves and light-permeable materials designed to interact with natural sunlight throughout the day.',
    productCount: 8,
    viewCount: 5102,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'SS25 Preview',
    slug: 'ss25-preview',
    status: 'Draft' as const,
    year: '2025',
    showroom: 'Concept',
    description: 'Upcoming spring collection focused on sustainable composites and lighter earth tones. Currently in prototyping phase.',
    productCount: 4,
    viewCount: 0,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=600&auto=format&fit=crop'
  }
];

export default function CollectionsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [collections, setCollections] = useState(initialCollections);

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary">Collections</h2>
          <p className="text-[12px] text-admin-text-muted mt-1 uppercase tracking-wider font-medium">Curate editorial product groups for the website.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-admin-gold/10"
        >
          New Collection
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Collections', value: '14' },
          { label: 'Active (Live)', value: '9' },
          { label: 'Drafts', value: '5' },
          { label: 'Featured', value: '3' },
        ].map((stat) => (
          <div key={stat.label} className="bg-admin-surface border border-admin-border p-4 rounded-[8px]">
            <p className="text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <p className="text-[20px] font-bold text-admin-text-primary tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grid Controls */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#2E2C28]">
        <div className="flex gap-6">
          <button className="text-admin-gold font-bold text-[12px] uppercase tracking-wider border-b-2 border-admin-gold pb-4 -mb-[18px]">All Collections</button>
          <button className="text-admin-text-muted font-bold text-[12px] uppercase tracking-wider hover:text-admin-text-primary transition-colors pb-4">Live</button>
          <button className="text-admin-text-muted font-bold text-[12px] uppercase tracking-wider hover:text-admin-text-primary transition-colors pb-4">Drafts</button>
          <button className="text-admin-text-muted font-bold text-[12px] uppercase tracking-wider hover:text-admin-text-primary transition-colors pb-4">Archived</button>
        </div>
        
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted text-[18px]">search</span>
          <input 
            className="admin-input !h-[36px] pl-10 pr-4 text-[13px] w-64" 
            placeholder="Search collections..." 
            type="text"
          />
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      {/* Side Panel */}
      <AddCollectionPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </div>
  );
}

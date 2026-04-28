'use client';

import React, { useState } from 'react';
import { CollectionCard } from '@/components/admin/CollectionCard';
import { AddCollectionPanel } from '@/components/admin/AddCollectionPanel';
import { useGetAllCollectionsQuery } from '@/lib/store';
import type { Collection } from '@/lib/types';

export default function CollectionsPage() {
  const { data, isLoading, isError } = useGetAllCollectionsQuery();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | undefined>(undefined);

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'DRAFT'>('ALL');

  const collections = data?.items ?? [];

  // Filter logic
  const filteredCollections = collections.filter((c: Collection) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'LIVE' && c.isActive) || 
      (statusFilter === 'DRAFT' && !c.isActive);

    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalCollections = collections.length;
  const liveCollections = collections.filter((c: Collection) => c.isActive).length;
  const draftCollections = totalCollections - liveCollections;
  const featuredCollections = collections.filter((c: Collection) => c.isFeatured).length;

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setIsPanelOpen(true);
  };

  const handleOpenNewPanel = () => {
    setEditingCollection(undefined);
    setIsPanelOpen(true);
  };

  return (
    <div className="relative pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary">Editorial Collections</h2>
          <p className="text-[12px] text-admin-text-muted mt-1">
            Curated stories — seasonal, thematic, and intentional groupings.
          </p>
        </div>
        <button
          onClick={handleOpenNewPanel}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-admin-gold/10"
        >
          New Collection
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Collections', value: totalCollections, icon: 'view_carousel' },
          { label: 'Live Stories', value: liveCollections, icon: 'visibility', color: 'text-admin-success' },
          { label: 'Featured', value: featuredCollections, icon: 'grade', color: 'text-admin-gold' },
          { label: 'Drafts', value: draftCollections, icon: 'edit_note' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#1A1916] border border-admin-border rounded-[8px] px-6 py-4 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B8680] block mb-1">{stat.label}</span>
              <span className={`text-[22px] font-bold text-admin-text-primary ${stat.color || ''}`}>
                {isLoading ? '…' : stat.value}
              </span>
            </div>
            <span className={`material-symbols-outlined text-[24px] text-[#8B8680]/30 ${stat.color || ''}`}>{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-[#1A1916] border border-admin-border rounded-[8px] p-4 mb-8 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8B8680]">search</span>
          <input 
            type="text" 
            placeholder="Search collections..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#131210] border border-admin-border/60 rounded-[6px] text-[13px] text-admin-text-primary placeholder-[#8B8680]/60 focus:border-admin-gold/50 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#131210] border border-admin-border/60 rounded-[6px] px-4 py-2 text-[12px] text-admin-text-primary font-medium focus:border-admin-gold/50 focus:outline-none appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="LIVE">Live Only</option>
            <option value="DRAFT">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Grid Area */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-admin-text-secondary">Loading collections...</p>
        </div>
      ) : isError ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">error</span>
          <p className="text-[14px] text-admin-text-secondary font-medium">Failed to load collections.</p>
        </div>
      ) : filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection: Collection) => (
            <CollectionCard 
              key={collection.id} 
              collection={collection} 
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 bg-[#1A1916] border border-admin-border border-dashed rounded-[8px] flex flex-col items-center justify-center text-center w-full col-span-full">
          <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">view_carousel</span>
          <p className="text-[14px] text-[#8B8680] font-medium">No collections found.</p>
        </div>
      )}

      {/* Create/Edit Slide-over Panel */}
      <AddCollectionPanel 
        isOpen={isPanelOpen} 
        onClose={() => {
          setIsPanelOpen(false);
          setEditingCollection(undefined);
        }} 
        initialData={editingCollection ? {
          id: editingCollection.id,
          name: editingCollection.name,
          slug: editingCollection.slug,
          description: editingCollection.description ?? undefined,
          badgeText: editingCollection.badgeText ?? undefined,
          year: editingCollection.year ?? undefined,
          showroomId: editingCollection.showroomId ?? undefined,
          isFeatured: editingCollection.isFeatured,
          isActive: editingCollection.isActive
        } : undefined}
      />
    </div>
  );
}

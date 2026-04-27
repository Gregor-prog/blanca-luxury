'use client';

import React, { useState } from 'react';
import { ShowroomCard } from '@/components/admin/ShowroomCard';
import { AddShowroomPanel } from '@/components/admin/AddShowroomPanel';
import { useGetAllShowroomsQuery } from '@/lib/store';
import type { Showroom } from '@/lib/types';

function toCardProps(s: Showroom) {
  return {
    id: s.id,
    name: s.name,
    isActive: s.isActive,
    city: s.city,
    address: s.address,
    phone: s.phoneNumbers[0] ?? '—',
    whatsapp: s.whatsappNumber ?? '—',
    email: s.email ?? '—',
    instagram: s.instagramHandle ?? '—',
    lat: s.latitude != null ? String(s.latitude) : '—',
    long: s.longitude != null ? String(s.longitude) : '—',
    isGeotagVerified: s.latitude != null && s.longitude != null,
    productCount: 0,
    coverImageUrl: s.coverImageUrl,
  };
}

export default function ShowroomsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { data, isLoading, isError } = useGetAllShowroomsQuery();

  const showrooms = data?.items ?? [];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-admin-border/20 pb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary mb-1">Showrooms</h2>
          <p className="text-[12px] text-admin-text-secondary font-medium">
            Manage locations, geotags, and contact details.
          </p>
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(201,169,110,0.15)]"
        >
          Add Showroom
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-admin-text-secondary">Loading showrooms...</p>
        </div>
      ) : isError ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">error</span>
          <p className="text-[14px] text-admin-text-secondary font-medium">Failed to load showrooms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {showrooms.map((showroom) => (
            <ShowroomCard key={showroom.id} showroom={toCardProps(showroom)} />
          ))}
          {showrooms.length === 0 && (
            <div className="col-span-2 py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">store</span>
              <p className="text-[14px] text-admin-text-secondary font-medium">No showrooms yet.</p>
            </div>
          )}
        </div>
      )}

      <AddShowroomPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

      <div className="h-20" />
    </div>
  );
}

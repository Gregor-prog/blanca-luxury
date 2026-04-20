'use client';

import React, { useState } from 'react';
import { ShowroomCard } from '@/components/admin/ShowroomCard';
import { AddShowroomPanel } from '@/components/admin/AddShowroomPanel';

const initialShowrooms = [
  {
    id: 'milan-flagship',
    name: 'Milan Flagship',
    isActive: true,
    city: 'Milan',
    address: 'Via Montenapoleone 14, 20121 Milan, Italy',
    phone: '+39 02 1234 5678',
    whatsapp: '+39 345 678 9012',
    email: 'milan@blanca.luxury',
    instagram: '@blanca_milan',
    lat: '45.4683',
    long: '9.1951',
    isGeotagVerified: true,
    productCount: 142
  },
  {
    id: 'paris-atelier',
    name: 'Paris Atelier',
    isActive: true,
    city: 'Paris',
    address: 'Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    phone: '+33 1 23 45 67 89',
    whatsapp: '+33 6 12 34 56 78',
    email: 'paris@blanca.luxury',
    instagram: '@blanca_paris',
    lat: '48.8698',
    long: '2.3168',
    isGeotagVerified: true,
    productCount: 87
  },
  {
    id: 'lagos-ikoyi',
    name: 'Lagos - Ikoyi',
    isActive: false,
    city: 'Lagos',
    address: '42 Glover Road, Ikoyi, Lagos, Nigeria',
    phone: '+234 1 234 5678',
    whatsapp: '+234 800 BLANCA',
    email: 'lagos@blanca.luxury',
    instagram: '@blanca.luxury.lagos',
    lat: '6.4542',
    long: '3.3958',
    isGeotagVerified: false,
    productCount: 24
  }
];

export default function ShowroomsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-admin-border/20 pb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary mb-1">Showrooms</h2>
          <p className="text-[12px] text-admin-text-secondary font-medium">Manage locations, geotags, and contact details.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(201,169,110,0.15)]"
        >
          Add Showroom
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Showrooms Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {initialShowrooms.map((showroom) => (
          <ShowroomCard key={showroom.id} showroom={showroom} />
        ))}
      </div>

      {/* Slide-out Panel */}
      <AddShowroomPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />

      {/* Bottom spacer for scrolling */}
      <div className="h-20" />
    </div>
  );
}

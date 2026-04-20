'use client';

import React from 'react';
import Link from 'next/link';

interface ShowroomProps {
  id: string;
  name: string;
  isActive: boolean;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  lat: string;
  long: string;
  isGeotagVerified: boolean;
  productCount: number;
}

export function ShowroomCard({ showroom }: { showroom: ShowroomProps }) {
  return (
    <article className="bg-admin-surface border border-admin-border rounded-[8px] p-6 relative overflow-hidden group hover:border-admin-gold/30 transition-all duration-300">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-admin-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[15px] font-medium text-admin-text-primary mb-1 underline-offset-4 group-hover:underline">{showroom.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${showroom.isActive ? 'bg-admin-success' : 'bg-admin-text-muted'} shadow-[0_0_8px_rgba(76,175,125,0.4)]`}></span>
            <span className="text-[10px] text-admin-text-secondary uppercase tracking-wider font-bold">
              {showroom.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={showroom.isActive} className="sr-only peer" readOnly />
          <div className="w-9 h-5 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-surface after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-admin-gold"></div>
        </label>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-8">
        {[
          { label: 'City', value: showroom.city },
          { label: 'Address', value: showroom.address },
          { label: 'Phone', value: showroom.phone },
          { label: 'WhatsApp', value: showroom.whatsapp },
          { label: 'Email', value: showroom.email },
          { label: 'Instagram', value: showroom.instagram },
        ].map((item) => (
          <div key={item.label} className="overflow-hidden">
            <p className="text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">{item.label}</p>
            <p className="text-[12px] text-admin-text-secondary truncate" title={item.value}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Geotag Section */}
      <div className="bg-admin-surface-elevated/50 rounded-[4px] p-3 flex items-center justify-between mb-6 border border-admin-border/20">
        <div className="flex items-center text-admin-text-secondary">
          <span className="material-symbols-outlined text-[16px] mr-2 text-admin-gold">location_on</span>
          <span className="text-[11px] font-mono tracking-tight">Lat: {showroom.lat} · Long: {showroom.long}</span>
        </div>
        {showroom.isGeotagVerified ? (
          <span className="text-[10px] text-admin-success font-bold tracking-wide uppercase">Verified ✓</span>
        ) : (
          <span className="text-[10px] text-admin-warning font-bold tracking-wide uppercase">Unverified !</span>
        )}
      </div>

      {/* Product Count */}
      <div className="flex items-center justify-between text-[11px] text-admin-text-secondary mb-6 border-b border-admin-border/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-admin-gold">inventory_2</span>
          <span><strong className="text-admin-text-primary font-bold">{showroom.productCount}</strong> Products assigned</span>
        </div>
        <Link href={`/admin/products?showroom=${showroom.id}`} className="hover:text-admin-gold transition-colors flex items-center gap-1">
          Filtered View <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </Link>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center divide-x divide-admin-border/30">
          <button className="pr-3 text-[12px] font-medium text-admin-gold hover:opacity-80 transition-opacity uppercase tracking-tight">Edit</button>
          <button className="px-3 text-[12px] font-medium text-admin-danger hover:opacity-80 transition-opacity uppercase tracking-tight">Delete</button>
        </div>
        <button className="text-[12px] font-bold text-admin-text-primary hover:text-admin-gold transition-all flex items-center gap-1 group-hover:translate-x-1 duration-300">
          View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </article>
  );
}

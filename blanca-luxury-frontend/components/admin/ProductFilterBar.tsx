'use client';

import React from 'react';

export function ProductFilterBar() {
  return (
    <div className="bg-admin-bg sticky top-0 z-30 py-3 border-b border-admin-border mb-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300">
      <div className="flex flex-1 items-center gap-4 w-full">
        {/* Search */}
        <div className="relative w-full max-w-[280px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-secondary text-[18px]">search</span>
          <input 
            className="admin-input !h-[36px] pl-10 pr-4 text-[13px]" 
            placeholder="Search products..." 
            type="text"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2">
          {['Category', 'Showroom', 'Status', 'Origin'].map((label) => (
            <button 
              key={label}
              className="flex items-center gap-2 bg-admin-surface border border-admin-border h-[36px] px-3 rounded-[6px] text-[12px] text-admin-text-primary hover:bg-admin-surface-elevated transition-colors"
            >
              <span>{label}</span>
              <span className="material-symbols-outlined text-[16px] text-admin-text-muted">keyboard_arrow_down</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Toggles */}
      <div className="flex items-center gap-1 bg-admin-surface border border-admin-border p-1 rounded-[6px]">
        <button className="h-[28px] w-[28px] flex items-center justify-center rounded-[4px] bg-admin-surface-elevated text-admin-gold">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
        </button>
        <button className="h-[28px] w-[28px] flex items-center justify-center rounded-[4px] text-admin-text-muted hover:text-admin-text-primary hover:bg-admin-surface-elevated transition-all">
          <span className="material-symbols-outlined text-[18px]">view_list</span>
        </button>
      </div>
    </div>
  );
}

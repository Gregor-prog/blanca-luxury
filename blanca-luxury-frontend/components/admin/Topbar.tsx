'use client';

import React from 'react';

export function Topbar() {
  return (
    <header className="h-[56px] bg-[#0F0E0C] border-b border-[#2E2C28] flex justify-between items-center px-8 z-40 sticky top-0">
      <div className="flex items-center gap-4">
        <h2 className="text-[16px] font-medium text-admin-text-primary">Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="text-admin-text-secondary hover:text-admin-gold transition-colors relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-admin-gold rounded-full border-2 border-admin-bg"></span>
        </button>
        
        <div className="h-4 w-px bg-admin-border" />
        
        {/* Action Button */}
        <button className="bg-admin-gold text-admin-bg px-4 py-1.5 rounded-full text-[12px] font-bold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Product
        </button>
      </div>
    </header>
  );
}

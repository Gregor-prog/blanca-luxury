'use client';

import React, { useState } from 'react';

interface BatchActionBarProps {
  selectedCount: number;
  onDelete?: () => void;
  onUpdateStatus?: (isActive: boolean) => void;
}

export function BatchActionBar({ selectedCount, onDelete, onUpdateStatus }: BatchActionBarProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-admin-surface border-2 border-admin-gold rounded-[12px] px-8 py-4 flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-6">
        <span className="text-[13px] font-bold text-admin-gold pr-6 border-r border-admin-border/50">
          {selectedCount} selected
        </span>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onUpdateStatus?.(true)}
            className="flex items-center gap-2 text-admin-text-primary hover:text-admin-gold transition-colors text-[12px] font-bold uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Set Active
          </button>
          
          <button 
            onClick={() => onUpdateStatus?.(false)}
            className="flex items-center gap-2 text-admin-text-primary hover:text-admin-gold transition-colors text-[12px] font-bold uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">draft</span>
            Set Draft
          </button>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 text-admin-danger hover:opacity-80 transition-opacity text-[12px] font-bold uppercase tracking-wider disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="w-4 h-4 border-2 border-admin-danger/30 border-t-admin-danger rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">delete</span>
            )}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

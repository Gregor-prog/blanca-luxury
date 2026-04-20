'use client';

import React from 'react';

interface FormCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  isCollapsible?: boolean;
}

export function FormCard({ label, children, className = '', isCollapsible = false }: FormCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <section className={`bg-admin-surface border border-admin-border rounded-admin-card p-6 flex flex-col gap-6 ${className}`}>
      <div 
        className={`flex justify-between items-center ${isCollapsible ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-gold">{label}</h2>
        {isCollapsible && (
          <span className={`material-symbols-outlined text-[18px] text-admin-text-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        )}
      </div>
      
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'}`}>
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </div>
    </section>
  );
}

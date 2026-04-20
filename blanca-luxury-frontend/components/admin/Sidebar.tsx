'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { section: 'OVERVIEW', items: [
    { name: 'Dashboard', icon: 'dashboard', href: '/admin' }
  ]},
  { section: 'CONTENT', items: [
    { name: 'Showrooms', icon: 'store', href: '/admin/showrooms' },
    { name: 'Products', icon: 'inventory_2', href: '/admin/products' },
    { name: 'Collections', icon: 'collections', href: '/admin/collections' },
    { name: 'Categories', icon: 'category', href: '/admin/categories' },
    { name: 'Projects', icon: 'architecture', href: '/admin/projects' },
    { name: 'Lookbook', icon: 'photo_library', href: '/admin/lookbook' },
    { name: 'Posts', icon: 'article', href: '/admin/posts' },
  ]},
  { section: 'CRM', items: [
    { name: 'Inquiries', icon: 'mail', href: '/admin/inquiries', badge: '5' }
  ]},
  { section: 'SETTINGS', items: [
    { name: 'Team & Admins', icon: 'group', href: '/admin/team' },
    { name: 'WhatsApp Templates', icon: 'chat', href: '/admin/whatsapp' },
    { name: 'Audit Log', icon: 'history', href: '/admin/audit' },
  ]}
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-[240px] bg-[#0F0E0C] border-r border-[#2E2C28] flex flex-col py-8 z-50 overflow-hidden">
      {/* Logo */}
      <div className="px-8 mb-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <Image
              src="/logo.png"
              alt="BLANCA LUXURY"
              width={100}
              height={30}
              className="h-6 w-auto object-contain brightness-125"
            />
          </div>
          <span className="text-[10px] text-admin-text-muted font-medium uppercase tracking-[0.1em]">Admin Portal</span>
        </div>
      </div>
      
      <div className="h-px bg-[#2E2C28] mx-8 mb-8" />

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        {sidebarItems.map((group) => (
          <div key={group.section} className="mb-8">
            <h3 className="px-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em] mb-3">{group.section}</h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-[4px] transition-all duration-200 group ${
                        isActive 
                        ? 'bg-admin-surface text-admin-gold border-l-2 border-admin-gold' 
                        : 'text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-admin-gold' : 'text-admin-text-muted group-hover:text-admin-text-primary'}`}>
                          {item.icon}
                        </span>
                        <span className="text-[13px] font-medium tracking-tight">{item.name}</span>
                      </div>
                      {'badge' in item && item.badge && (
                        <span className="bg-admin-gold text-admin-bg text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* User Support / Sign Out */}
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 px-4 py-4 border-t border-[#2E2C28] mb-4">
          <div className="w-8 h-8 rounded-full bg-admin-surface flex items-center justify-center text-[11px] font-bold text-admin-gold border border-admin-gold/20">
            ET
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-admin-text-primary">E. Thompson</span>
            <span className="text-[10px] text-admin-text-muted uppercase tracking-wider">Super Admin</span>
          </div>
        </div>
        
        <Link href="/admin/login" className="flex items-center gap-3 px-4 py-2 text-admin-text-muted hover:text-admin-danger transition-colors group">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Sign Out</span>
        </Link>
      </div>
    </nav>
  );
}

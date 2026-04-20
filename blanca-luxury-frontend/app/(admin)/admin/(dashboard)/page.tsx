'use client';

import React from 'react';
import Image from 'next/image';

const stats = [
  { label: 'Total Products', value: '142', sub: '+3 this week', subColor: 'text-admin-success', icon: 'inventory_2' },
  { label: 'Active Collections', value: '2', sub: '2 live', subColor: 'text-admin-text-secondary', icon: 'collections' },
  { label: 'Pending Inquiries', value: '5', sub: '5 unread', subColor: 'text-admin-warning', icon: 'mail' },
  { label: 'Active Showrooms', value: '3', sub: 'PH · Lagos · Abuja', subColor: 'text-admin-text-secondary', icon: 'store' },
];

const inquiries = [
  { name: 'Adeola O.', service: 'Bespoke Fitting', showroom: 'Lagos - Ikoyi', source: 'WhatsApp', status: 'New', time: '10m ago' },
  { name: 'Chidi M.', service: 'Collection Viewing', showroom: 'Abuja', source: 'Instagram', status: 'In Progress', time: '1h ago' },
  { name: 'Zainab A.', service: 'Alterations', showroom: 'Lagos - VI', source: 'Website', status: 'Resolved', time: 'Yesterday' },
  { name: 'Femi K.', service: 'Bridal Consultation', showroom: 'Port Harcourt', source: 'Direct', status: 'New', time: 'Yesterday' },
];

const quickActions = [
  { label: 'Add Product', icon: 'add' },
  { label: 'New Collection', icon: 'create_new_folder' },
  { label: 'Upload Lookbook Image', icon: 'add_a_photo' },
  { label: 'Create Post', icon: 'edit_square' },
];

const activeCollections = [
  { name: 'Obsidian Evening', products: 24, showroom: 'Lagos', image: 'https://images.unsplash.com/photo-1539109132314-34a9c66d1307?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sahara Essentials', products: 18, showroom: 'Abuja', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-admin-surface border border-admin-border p-5 rounded-[8px] relative overflow-hidden group">
            <span className="material-symbols-outlined text-[14px] text-admin-gold absolute top-5 right-5">
              {stat.icon}
            </span>
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-admin-text-secondary uppercase tracking-wider">{stat.label}</span>
              <h3 className="text-[32px] font-medium text-admin-text-primary tracking-tight">{stat.value}</h3>
              <p className={`text-[11px] font-medium ${stat.subColor}`}>{stat.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-8 bg-admin-surface border border-admin-border rounded-[8px] overflow-hidden">
          <div className="px-6 py-5 border-b border-admin-border/50 flex justify-between items-center">
            <h3 className="text-[13px] font-medium text-admin-text-primary uppercase tracking-wider">Recent Inquiries</h3>
            <button className="text-[12px] font-medium text-admin-gold hover:opacity-80 transition-opacity">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em] border-b border-admin-border/20">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Showroom</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/10">
                {inquiries.map((inquiry, idx) => (
                  <tr key={idx} className="admin-table-row group">
                    <td className="px-6 py-4 font-medium text-admin-text-primary">{inquiry.name}</td>
                    <td className="px-6 py-4 text-admin-text-secondary">{inquiry.service}</td>
                    <td className="px-6 py-4 text-admin-text-secondary">{inquiry.showroom}</td>
                    <td className="px-6 py-4 text-admin-text-secondary">{inquiry.source}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                        inquiry.status === 'New' ? 'bg-admin-gold text-admin-bg' :
                        inquiry.status === 'In Progress' ? 'bg-admin-warning text-admin-bg' :
                        'bg-admin-success text-admin-bg'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-admin-text-muted">{inquiry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-admin-surface border border-admin-border p-6 rounded-[8px]">
            <h3 className="text-[13px] font-medium text-admin-text-primary uppercase tracking-wider mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button 
                  key={action.label}
                  className="w-full h-[40px] px-4 border border-admin-border rounded-[4px] text-admin-text-primary text-[12px] font-medium flex items-center justify-between hover:border-admin-gold hover:text-admin-gold transition-all group"
                >
                  {action.label}
                  <span className="material-symbols-outlined text-[18px] text-admin-text-muted group-hover:text-admin-gold">
                    {action.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* System Status */}
          <div className="bg-admin-surface/30 border border-admin-border/50 p-4 rounded-[8px] flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-admin-success animate-pulse" />
            <span className="text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Active Collections Strip */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[13px] font-medium text-admin-text-primary uppercase tracking-wider">Active Collections</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-admin-border flex items-center justify-center text-admin-text-muted hover:text-admin-gold hover:border-admin-gold transition-all">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-full border border-admin-border flex items-center justify-center text-admin-text-muted hover:text-admin-gold hover:border-admin-gold transition-all">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {activeCollections.map((col) => (
            <div key={col.name} className="min-w-[280px] h-[160px] bg-admin-surface-elevated border border-admin-border rounded-[8px] relative overflow-hidden group cursor-pointer snap-start">
              <Image 
                src={col.image} 
                alt={col.name} 
                fill 
                className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-admin-bg via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-1.5 py-0.5 bg-admin-gold/10 text-admin-gold text-[9px] font-bold uppercase tracking-wider mb-2 border border-admin-gold/20 rounded-[2px]">
                  {col.showroom}
                </span>
                <h4 className="text-[16px] font-medium text-admin-text-primary">{col.name}</h4>
                <p className="text-[11px] text-admin-text-muted">{col.products} Products</p>
              </div>
            </div>
          ))}
          {/* Draft Placeholder */}
          <div className="min-w-[280px] h-[160px] border-2 border-dashed border-admin-border/30 rounded-[8px] flex flex-col items-center justify-center gap-3 text-admin-text-muted hover:border-admin-gold/50 hover:text-admin-gold transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[32px]">add_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Draft New Collection</span>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  useGetAdminProductsQuery,
  useGetAllCategoriesQuery,
  useGetInquiriesQuery,
  useGetAllShowroomsQuery,
} from '@/lib/store';

function StatCard({
  label,
  value,
  sub,
  subColor,
  icon,
  isLoading,
}: {
  label: string;
  value: string;
  sub: string;
  subColor: string;
  icon: string;
  isLoading?: boolean;
}) {
  return (
    <div className="bg-admin-surface border border-admin-border p-5 rounded-[8px] relative overflow-hidden group">
      <span className="material-symbols-outlined text-[14px] text-admin-gold absolute top-5 right-5">{icon}</span>
      <div className="space-y-1">
        <span className="text-[11px] font-medium text-admin-text-secondary uppercase tracking-wider">{label}</span>
        <h3 className="text-[32px] font-medium text-admin-text-primary tracking-tight">
          {isLoading ? <span className="text-[20px] text-admin-text-muted animate-pulse">—</span> : value}
        </h3>
        <p className={`text-[11px] font-medium ${subColor}`}>{sub}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: productsData, isLoading: loadingProducts } = useGetAdminProductsQuery({ limit: 1 });
  const { data: categoriesData, isLoading: loadingCategories } = useGetAllCategoriesQuery();
  const { data: inquiriesData, isLoading: loadingInquiries } = useGetInquiriesQuery({});
  const { data: showroomsData, isLoading: loadingShowrooms } = useGetAllShowroomsQuery();

  const totalProducts = productsData?.total ?? 0;
  const activeCategories = (categoriesData?.items ?? []).filter((c) => c.isActive).length;
  const newInquiries = (inquiriesData?.items ?? []).filter((i) => i.status === 'NEW').length;
  const totalInquiries = inquiriesData?.total ?? 0;
  const activeShowrooms = (showroomsData?.items ?? []).filter((s) => s.isActive);
  const showroomCities = activeShowrooms.map((s) => s.city).slice(0, 3).join(' · ') || '—';

  const stats = [
    {
      label: 'Total Products',
      value: String(totalProducts),
      sub: 'across all showrooms',
      subColor: 'text-admin-success',
      icon: 'inventory_2',
      isLoading: loadingProducts,
    },
    {
      label: 'Active Collections',
      value: String(activeCategories),
      sub: `${activeCategories} live`,
      subColor: 'text-admin-text-secondary',
      icon: 'collections',
      isLoading: loadingCategories,
    },
    {
      label: 'New Inquiries',
      value: String(newInquiries),
      sub: `${totalInquiries} total`,
      subColor: newInquiries > 0 ? 'text-admin-warning' : 'text-admin-text-secondary',
      icon: 'mail',
      isLoading: loadingInquiries,
    },
    {
      label: 'Active Showrooms',
      value: String(activeShowrooms.length),
      sub: showroomCities,
      subColor: 'text-admin-text-secondary',
      icon: 'store',
      isLoading: loadingShowrooms,
    },
  ];

  const recentInquiries = (inquiriesData?.items ?? []).slice(0, 5);

  const quickActions = [
    { label: 'Add Product', icon: 'add', href: '/admin/products/add' },
    { label: 'New Collection', icon: 'create_new_folder', href: '/admin/collections' },
    { label: 'View Inquiries', icon: 'mail', href: '/admin/inquiries' },
    { label: 'Manage Showrooms', icon: 'store', href: '/admin/showrooms' },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-8 bg-admin-surface border border-admin-border rounded-[8px] overflow-hidden">
          <div className="px-6 py-5 border-b border-admin-border/50 flex justify-between items-center">
            <h3 className="text-[13px] font-medium text-admin-text-primary uppercase tracking-wider">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-[12px] font-medium text-admin-gold hover:opacity-80 transition-opacity">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loadingInquiries ? (
              <div className="py-12 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-admin-text-muted">No inquiries yet.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em] border-b border-admin-border/20">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Interest</th>
                    <th className="px-6 py-4">Showroom</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border/10">
                  {recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="admin-table-row group">
                      <td className="px-6 py-4 font-medium text-admin-text-primary">{inquiry.fullName}</td>
                      <td className="px-6 py-4 text-admin-text-secondary">{inquiry.serviceInterest ?? '—'}</td>
                      <td className="px-6 py-4 text-admin-text-secondary">{inquiry.showroom?.name ?? '—'}</td>
                      <td className="px-6 py-4 text-admin-text-secondary">{inquiry.source}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                          inquiry.status === 'NEW' ? 'bg-admin-gold text-admin-bg' :
                          inquiry.status === 'IN_PROGRESS' ? 'bg-admin-warning text-admin-bg' :
                          'bg-admin-success text-admin-bg'
                        }`}>
                          {inquiry.status === 'NEW' ? 'New' : inquiry.status === 'IN_PROGRESS' ? 'In Progress' : inquiry.status === 'QUOTED' ? 'Quoted' : inquiry.status === 'CONVERTED' ? 'Converted' : 'Closed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-admin-surface border border-admin-border p-6 rounded-[8px]">
            <h3 className="text-[13px] font-medium text-admin-text-primary uppercase tracking-wider mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="w-full h-[40px] px-4 border border-admin-border rounded-[4px] text-admin-text-primary text-[12px] font-medium flex items-center justify-between hover:border-admin-gold hover:text-admin-gold transition-all group"
                >
                  {action.label}
                  <span className="material-symbols-outlined text-[18px] text-admin-text-muted group-hover:text-admin-gold">
                    {action.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>

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
          <Link href="/admin/collections" className="text-[12px] font-medium text-admin-gold hover:opacity-80 transition-opacity">
            View All →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {loadingCategories ? (
            <div className="flex gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="min-w-[280px] h-[160px] bg-admin-surface border border-admin-border rounded-[8px] animate-pulse" />
              ))}
            </div>
          ) : (
            (categoriesData?.items ?? [])
              .filter((c) => c.isActive)
              .slice(0, 6)
              .map((col) => (
                <div
                  key={col.id}
                  className="min-w-[280px] h-[160px] bg-admin-surface-elevated border border-admin-border rounded-[8px] relative overflow-hidden group cursor-pointer snap-start"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-admin-bg via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <h4 className="text-[16px] font-medium text-admin-text-primary">{col.name}</h4>
                    <p className="text-[11px] text-admin-text-muted">{col._count?.products ?? 0} Products</p>
                  </div>
                </div>
              ))
          )}
          <Link
            href="/admin/collections"
            className="min-w-[280px] h-[160px] border-2 border-dashed border-admin-border/30 rounded-[8px] flex flex-col items-center justify-center gap-3 text-admin-text-muted hover:border-admin-gold/50 hover:text-admin-gold transition-all cursor-pointer snap-start"
          >
            <span className="material-symbols-outlined text-[32px]">add_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">New Collection</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

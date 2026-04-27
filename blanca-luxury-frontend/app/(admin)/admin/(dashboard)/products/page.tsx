'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductFilterBar } from '@/components/admin/ProductFilterBar';
import { ProductRow } from '@/components/admin/ProductRow';
import { BatchActionBar } from '@/components/admin/BatchActionBar';
import { useGetAdminProductsQuery, useUpdateProductMutation } from '@/lib/store';
import type { ProductListItem, ProductOrigin } from '@/lib/types';

const ORIGIN_LABEL: Record<ProductOrigin, string> = {
  ITALY: 'Italy',
  TURKEY: 'Turkey',
  LOCAL: 'Local',
  OTHER: 'Other',
};

const ORIGIN_FLAG: Record<ProductOrigin, string> = {
  ITALY: '🇮🇹',
  TURKEY: '🇹🇷',
  LOCAL: '🇳🇬',
  OTHER: '🌐',
};

function toRowProps(p: ProductListItem) {
  const primary = p.media.find((m) => m.isPrimary) ?? p.media[0];
  return {
    id: p.id,
    name: p.name,
    sku: p.slug,
    image: primary?.url ?? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300&auto=format&fit=crop',
    category: p.category?.name ?? '—',
    showroom: p.showroom?.name ?? '—',
    origin: ORIGIN_LABEL[p.origin] ?? p.origin,
    originFlag: ORIGIN_FLAG[p.origin] ?? '🌐',
    status: (p.isActive ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
    isFeatured: p.isFeatured,
  };
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAdminProductsQuery({ page, limit: 24 });
  const [updateProduct] = useUpdateProductMutation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const products = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleFeatured = async (id: string) => {
    const product = data?.byId[id];
    if (!product) return;
    await updateProduct({ id, body: { isFeatured: !product.isFeatured } });
  };

  const isAllSelected = selectedIds.length === products.length && products.length > 0;
  const toggleAll = () => {
    setSelectedIds(isAllSelected ? [] : products.map((p) => p.id));
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary">Products</h2>
          <span className="bg-admin-surface border border-admin-border px-2 py-0.5 rounded-[4px] text-admin-text-secondary text-[12px] font-bold">
            {isLoading ? '…' : total}
          </span>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          Add Product
          <span className="material-symbols-outlined text-[18px]">add</span>
        </Link>
      </div>

      <ProductFilterBar />

      <div className="bg-admin-surface border border-admin-border rounded-[8px] overflow-hidden shadow-sm">
        <div className="h-[44px] bg-admin-surface-elevated/20 flex items-center px-4 border-b border-admin-border">
          <div className="flex items-center w-12 text-left">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded-[2px] border-admin-border bg-admin-surface text-admin-gold focus:ring-1 focus:ring-admin-gold cursor-pointer"
            />
          </div>
          <div className="w-16 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Image</div>
          <div className="flex-1 min-w-[200px] text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Product Name</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Category</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Showroom</div>
          <div className="flex-1 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Origin</div>
          <div className="w-24 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Status</div>
          <div className="w-16 text-center text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Featured</div>
          <div className="w-12 text-right text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.15em]">Actions</div>
        </div>

        <div className="divide-y divide-admin-border/10">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
              <p className="text-[13px] text-admin-text-secondary">Loading products...</p>
            </div>
          ) : isError ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">error</span>
              <p className="text-[14px] text-admin-text-secondary font-medium">Failed to load products.</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={{
                  ...toRowProps(product),
                  isSelected: selectedIds.includes(product.id),
                  onToggleSelection: toggleSelection,
                  onToggleFeatured: toggleFeatured,
                }}
              />
            ))
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">inventory_2</span>
              <p className="text-[14px] text-admin-text-secondary font-medium">No products found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between pb-24">
        <p className="text-[12px] text-admin-text-secondary">
          Showing {Math.min((page - 1) * 24 + 1, total)}–{Math.min(page * 24, total)} of {total} products
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] text-[13px] ${
                page === p
                  ? 'bg-admin-gold text-admin-bg font-bold'
                  : 'border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-admin-border text-admin-text-secondary hover:bg-admin-surface transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      <BatchActionBar selectedCount={selectedIds.length} />
    </div>
  );
}

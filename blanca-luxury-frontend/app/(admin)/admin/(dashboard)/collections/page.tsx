"use client";

import React, { useState } from "react";
import { CollectionCard } from "@/components/admin/CollectionCard";
import { useGetAllCategoriesQuery } from "@/lib/store/categoriesApi";
import { AddCollectionPanel } from "@/components/admin/AddCollectionPanel";
function toCardProps(c: any) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    status: (c.isActive ? "Live" : "Draft") as "Live" | "Draft" | "Archived",
    year: "",
    showroom: "",
    description: c.description ?? "",
    productCount: c._count?.products ?? 0,
    viewCount: 0,
    isFeatured: false,
    coverImage:
      c.imageUrl ??
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
  };
}

export default function CollectionsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [tabFilter, setTabFilter] = useState<"All" | "Live" | "Drafts">("All");
  const { data, isLoading, isError } = useGetAllCategoriesQuery();

  const allCategories = data?.items ?? [];
  const collections = allCategories
    .map(toCardProps)
    .filter((c) =>
      tabFilter === "All"
        ? true
        : tabFilter === "Live"
          ? c.status === "Live"
          : c.status === "Draft",
    );

  const liveCount = allCategories.filter((c) => c.isActive).length;
  const draftCount = allCategories.filter((c) => !c.isActive).length;

  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary">
            Collections
          </h2>
          <p className="text-[12px] text-admin-text-muted mt-1 uppercase tracking-wider font-medium">
            Curate editorial product groups for the website.
          </p>
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-admin-gold/10"
        >
          New Collection
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Total Collections",
            value: isLoading ? "…" : String(allCategories.length),
          },
          {
            label: "Active (Live)",
            value: isLoading ? "…" : String(liveCount),
          },
          { label: "Drafts", value: isLoading ? "…" : String(draftCount) },
          { label: "Featured", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-admin-surface border border-admin-border p-4 rounded-[8px]"
          >
            <p className="text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-[20px] font-bold text-admin-text-primary tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tab Controls */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#2E2C28]">
        <div className="flex gap-6">
          {(["All", "Live", "Drafts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTabFilter(tab)}
              className={`font-bold text-[12px] uppercase tracking-wider pb-4 transition-colors ${
                tabFilter === tab
                  ? "text-admin-gold border-b-2 border-admin-gold -mb-[18px]"
                  : "text-admin-text-muted hover:text-admin-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted text-[18px]">
            search
          </span>
          <input
            className="admin-input !h-[36px] pl-10 pr-4 text-[13px] w-64"
            placeholder="Search collections..."
            type="text"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-admin-text-secondary">
            Loading collections...
          </p>
        </div>
      ) : isError ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">
            error
          </span>
          <p className="text-[14px] text-admin-text-secondary">
            Failed to load collections.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
          {collections.length === 0 && (
            <div className="col-span-2 py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">
                collections
              </span>
              <p className="text-[14px] text-admin-text-secondary font-medium">
                No collections found.
              </p>
            </div>
          )}
        </div>
      )}

      <AddCollectionPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}

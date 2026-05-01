"use client";

import React, { useState, useMemo } from "react";
import { CollectionCard } from "@/components/admin/CollectionCard";
import { useGetAllCollectionsQuery, useDeleteCollectionMutation } from "@/lib/store";
import { AddCollectionPanel, type CollectionData } from "@/components/admin/AddCollectionPanel";
import type { Collection } from "@/lib/types";

export default function CollectionsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CollectionData | undefined>(undefined);
  const [tabFilter, setTabFilter] = useState<"All" | "Live" | "Drafts">("All");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<Collection | null>(null);

  const { data, isLoading, isError } = useGetAllCollectionsQuery();
  const [deleteCollection, { isLoading: isDeleting }] = useDeleteCollectionMutation();

  const allCollections = data?.items ?? [];

  const collections = useMemo(() => {
    let result = allCollections;
    if (tabFilter === "Live") result = result.filter((c) => c.isActive);
    else if (tabFilter === "Drafts") result = result.filter((c) => !c.isActive);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.showroom?.name.toLowerCase().includes(q) ||
          c.badgeText?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [allCollections, tabFilter, search]);

  const liveCount = allCollections.filter((c) => c.isActive).length;
  const draftCount = allCollections.filter((c) => !c.isActive).length;
  const featuredCount = allCollections.filter((c) => c.isFeatured).length;

  function handleEdit(c: Collection) {
    setEditTarget({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      badgeText: c.badgeText ?? "",
      year: c.year ?? undefined,
      showroomId: c.showroomId ?? "",
      isFeatured: c.isFeatured,
      isActive: c.isActive,
    });
    setIsPanelOpen(true);
  }

  function handlePanelClose() {
    setIsPanelOpen(false);
    setEditTarget(undefined);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    try {
      await deleteCollection(deleteConfirm.id).unwrap();
      setDeleteConfirm(null);
    } catch {
      // error is surfaced by RTK Query
    }
  }

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
          onClick={() => { setEditTarget(undefined); setIsPanelOpen(true); }}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-admin-gold/10"
        >
          New Collection
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Collections", value: isLoading ? "…" : String(allCollections.length) },
          { label: "Active (Live)", value: isLoading ? "…" : String(liveCount) },
          { label: "Drafts", value: isLoading ? "…" : String(draftCount) },
          { label: "Featured", value: isLoading ? "…" : String(featuredCount) },
        ].map((stat) => (
          <div key={stat.label} className="bg-admin-surface border border-admin-border p-4 rounded-[8px]">
            <p className="text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-[20px] font-bold text-admin-text-primary tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tab Controls + Search */}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-admin-text-secondary">Loading collections...</p>
        </div>
      ) : isError ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">error</span>
          <p className="text-[14px] text-admin-text-secondary">Failed to load collections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onEdit={handleEdit}
              onDelete={(c) => setDeleteConfirm(c)}
            />
          ))}
          {collections.length === 0 && (
            <div className="col-span-2 py-24 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">collections</span>
              <p className="text-[14px] text-admin-text-secondary font-medium">No collections found.</p>
            </div>
          )}
        </div>
      )}

      <AddCollectionPanel
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        initialData={editTarget}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-admin-bg/80 backdrop-blur-sm z-80 flex items-center justify-center p-4">
          <div className="bg-admin-surface border border-admin-border rounded-xl p-8 max-w-100 w-full shadow-2xl">
            <h3 className="text-[16px] font-bold text-admin-text-primary mb-2">Delete Collection?</h3>
            <p className="text-[13px] text-admin-text-muted mb-6 leading-relaxed">
              This will permanently delete <strong className="text-admin-text-primary">{deleteConfirm.name}</strong> and remove all product associations. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-admin-border rounded-[6px] text-[12px] font-bold uppercase tracking-wider text-admin-text-muted hover:border-admin-gold/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-admin-danger rounded-[6px] text-[12px] font-bold uppercase tracking-wider text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

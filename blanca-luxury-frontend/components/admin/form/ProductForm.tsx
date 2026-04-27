'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FormCard } from './FormCard';
import { TagInput } from './CustomInputs';
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
  useGetAllShowroomsQuery,
} from '@/lib/store';
import type { ProductOrigin } from '@/lib/types';

const ORIGINS: { value: ProductOrigin; label: string; flag: string }[] = [
  { value: 'ITALY', label: 'Italy', flag: '🇮🇹' },
  { value: 'TURKEY', label: 'Turkey', flag: '🇹🇷' },
  { value: 'LOCAL', label: 'Local (Nigeria)', flag: '🇳🇬' },
  { value: 'OTHER', label: 'Other', flag: '🌐' },
];

interface ImageFile {
  file: File;
  preview: string;
}

interface ProductFormProps {
  mode: 'add' | 'edit';
  initialData?: Record<string, unknown>;
}

export function ProductForm({ mode }: ProductFormProps) {
  const router = useRouter();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: showroomsData } = useGetAllShowroomsQuery();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState<ProductOrigin>('ITALY');
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [price, setPrice] = useState('');
  const [priceOnRequest, setPriceOnRequest] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [showroomId, setShowroomId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // ── Image state ─────────────────────────────────────────────────────────────
  const [images, setImages] = useState<ImageFile[]>([]);
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // ── Status / feedback ───────────────────────────────────────────────────────
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ── Slug auto-generation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (mode === 'add') {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  }, [name, mode]);

  // ── Image handlers ───────────────────────────────────────────────────────────
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = (idx: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // ── Build FormData & submit ──────────────────────────────────────────────────
  const buildFormData = (): FormData => {
    const fd = new FormData();
    fd.append('name', name.trim());
    if (slug) fd.append('slug', slug.trim());
    if (description) fd.append('description', description.trim());
    if (style) fd.append('style', style.trim());
    if (type) fd.append('type', type.trim());
    fd.append('origin', origin);
    if (materials) fd.append('materials', materials.trim());
    if (dimensions) fd.append('dimensions', dimensions.trim());
    if (leadTime) fd.append('leadTime', leadTime.trim());
    if (!priceOnRequest && price) fd.append('price', price.replace(/,/g, '').trim());
    fd.append('priceOnRequest', String(priceOnRequest));
    if (categoryId) fd.append('categoryId', categoryId);
    if (showroomId) fd.append('showroomId', showroomId);
    fd.append('isFeatured', String(isFeatured));
    fd.append('isActive', String(isActive));
    if (metaTitle) fd.append('metaTitle', metaTitle.trim());
    if (metaDescription) fd.append('metaDescription', metaDescription.trim());
    images.forEach((img) => fd.append('images', img.file));
    return fd;
  };

  const handleSubmit = async (publishActive: boolean) => {
    if (!name.trim()) { setErrorMsg('Product name is required.'); return; }
    setErrorMsg(null);
    // Override isActive based on which button was clicked
    const fd = buildFormData();
    fd.set('isActive', String(publishActive));

    try {
      const result = await createProduct(fd).unwrap();
      router.push(`/admin/products/${result.id}`);
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 409) setErrorMsg('A product with this slug already exists.');
      else if (status === 413) setErrorMsg('One or more images exceed the 50 MB limit.');
      else setErrorMsg('Failed to save product. Please try again.');
    }
  };

  const categories = categoriesData?.items ?? [];
  const showrooms = showroomsData?.items ?? [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto min-h-screen pb-20">

      {/* ── LEFT COLUMN (primary content) ───────────────────────────────────── */}
      <div className="flex-1 space-y-8 min-w-0">

        {/* Error banner */}
        {errorMsg && (
          <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[6px] px-4 py-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-admin-danger text-[18px]">error</span>
            <p className="text-admin-danger text-[13px] font-medium">{errorMsg}</p>
          </div>
        )}

        {/* CARD 1 — Basic Info */}
        <FormCard label="BASIC INFORMATION">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-name">Product Name *</label>
              <input
                id="pf-name"
                className="admin-input !h-[48px] text-[16px] font-medium"
                placeholder="e.g. Obsidian Lounge Chair"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-slug">URL Slug (auto-generated)</label>
              <div className="relative">
                <input
                  id="pf-slug"
                  className="admin-input !bg-admin-surface-elevated/50 font-mono text-[13px] text-admin-text-muted"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-admin-text-muted">link</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="admin-label uppercase" htmlFor="pf-desc">Description</label>
                <span className="text-[10px] text-admin-text-muted">{description.length} chars</span>
              </div>
              <textarea
                id="pf-desc"
                className="admin-input h-[180px] py-4 resize-none leading-relaxed text-[14px]"
                placeholder="Describe the masterpiece..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </FormCard>

        {/* CARD 2 — Product Details */}
        <FormCard label="PRODUCT DETAILS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-style">Style</label>
              <input
                id="pf-style"
                className="admin-input"
                placeholder="e.g. Contemporary, Minimalist"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-type">Type</label>
              <input
                id="pf-type"
                className="admin-input"
                placeholder="e.g. Sofa, Dining Table, Lighting"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-origin">Origin</label>
              <select
                id="pf-origin"
                className="admin-input appearance-none bg-[#1A1916] cursor-pointer"
                value={origin}
                onChange={(e) => setOrigin(e.target.value as ProductOrigin)}
              >
                {ORIGINS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.flag} {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-materials">Materials</label>
              <input
                id="pf-materials"
                className="admin-input"
                placeholder="e.g. Charred Oak, Aniline Leather"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-dims">Dimensions</label>
              <input
                id="pf-dims"
                className="admin-input"
                placeholder="W × D × H cm"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-lead">Lead Time</label>
              <input
                id="pf-lead"
                className="admin-input"
                placeholder="e.g. 8–12 Weeks"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
              />
            </div>
          </div>
        </FormCard>

        {/* CARD 3 — Pricing */}
        <FormCard label="PRICING">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-2">
              <label className="admin-label" htmlFor="pf-price">Listing Price (₦)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-muted font-bold">₦</span>
                <input
                  id="pf-price"
                  className={`admin-input pl-10 text-[18px] font-bold ${priceOnRequest ? 'opacity-30 pointer-events-none' : ''}`}
                  disabled={priceOnRequest}
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 bg-admin-surface-elevated/30 p-4 rounded-[8px] border border-admin-border/30">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary">Price on Request</span>
                <span className="text-[11px] text-admin-text-muted">Hide price, show &apos;Inquire&apos; button</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={priceOnRequest}
                  onChange={(e) => setPriceOnRequest(e.target.checked)}
                />
                <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
            </div>
          </div>
        </FormCard>

        {/* CARD 4 — Product Media */}
        <FormCard label="PRODUCT MEDIA">
          {/* Hidden file inputs */}
          <input
            ref={primaryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => primaryInputRef.current?.click()}
            className={`border-2 border-dashed rounded-admin-card flex flex-col items-center justify-center gap-2 cursor-pointer transition-all h-[180px] ${
              isDragging
                ? 'border-admin-gold bg-admin-gold/5'
                : 'border-admin-border/40 bg-admin-surface-elevated/10 hover:border-admin-gold/50 hover:bg-admin-surface-elevated/20'
            }`}
          >
            <span className="material-symbols-outlined text-[32px] text-admin-gold">add_a_photo</span>
            <div className="text-center">
              <p className="text-[14px] font-medium text-admin-text-primary">
                {isDragging ? 'Drop images here' : 'Drag & drop images'}
              </p>
              <p className="text-[11px] text-admin-text-muted">
                or <span className="text-admin-gold">click to browse</span> · Max 50 MB each
              </p>
            </div>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover rounded-[4px] border border-admin-border/30"
                  />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-admin-gold text-admin-bg text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] uppercase tracking-wide">
                      Primary
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-admin-bg/80 text-admin-danger rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              {/* Add more */}
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-admin-border/30 rounded-[4px] flex flex-col items-center justify-center text-[10px] font-bold text-admin-text-muted uppercase tracking-widest hover:border-admin-gold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] mb-1">add_circle</span>
                More
              </button>
            </div>
          )}
        </FormCard>

        {/* CARD 5 — SEO */}
        <FormCard label="SEO & META" isCollapsible>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-meta-title">Meta Title</label>
              <input
                id="pf-meta-title"
                className="admin-input"
                placeholder="Search engine title..."
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="admin-label" htmlFor="pf-meta-desc">Meta Description</label>
                <span className="text-[10px] text-admin-text-muted">{metaDescription.length}/160</span>
              </div>
              <textarea
                id="pf-meta-desc"
                className="admin-input h-[100px] py-3 resize-none"
                maxLength={160}
                placeholder="Search engine description..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>
        </FormCard>
      </div>

      {/* ── RIGHT COLUMN (sticky settings) ──────────────────────────────────── */}
      <div className="lg:w-[380px] flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          <section className="bg-admin-surface border border-admin-border rounded-admin-card p-6 flex flex-col gap-6 shadow-xl">

            {/* Status toggle */}
            <div className="flex items-center justify-between">
              <span className="admin-label !mb-0">Status</span>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${
                isActive
                  ? 'bg-admin-success/10 border-admin-success/30 text-admin-success'
                  : 'bg-admin-warning/10 border-admin-warning/30 text-admin-warning'
              }`}
                onClick={() => setIsActive(!isActive)}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-admin-success' : 'bg-admin-warning'}`} />
                {isActive ? 'Active' : 'Draft'}
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between border-t border-admin-border/20 pt-5">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary">Featured Product</span>
                <span className="text-[11px] text-admin-text-muted mt-0.5">Showcase on homepage</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <div className="w-10 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
            </div>

            {/* Category */}
            <div className="space-y-2 border-t border-admin-border/20 pt-5">
              <label className="admin-label" htmlFor="pf-cat">Category</label>
              <select
                id="pf-cat"
                className="admin-input appearance-none bg-[#1A1916] cursor-pointer"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Showroom */}
            <div className="space-y-2">
              <label className="admin-label" htmlFor="pf-showroom">Showroom</label>
              <select
                id="pf-showroom"
                className="admin-input appearance-none bg-[#1A1916] cursor-pointer"
                value={showroomId}
                onChange={(e) => setShowroomId(e.target.value)}
              >
                <option value="">— Not displayed —</option>
                {showrooms.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} · {s.city}</option>
                ))}
              </select>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-3 border-t border-admin-border/20">
              <button
                type="button"
                disabled={isCreating}
                onClick={() => handleSubmit(false)}
                className="w-full bg-admin-surface-elevated border border-admin-border text-admin-text-primary h-[48px] font-bold text-[12px] uppercase tracking-widest rounded-admin-input hover:bg-admin-surface-elevated/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">save</span>
                )}
                Save as Draft
              </button>

              <button
                type="button"
                disabled={isCreating}
                onClick={() => handleSubmit(true)}
                className="admin-button-gold !h-[48px] font-bold uppercase tracking-[0.15em] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <svg className="animate-spin h-4 w-4 text-admin-bg" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">publish</span>
                )}
                Publish Product
              </button>
            </div>
          </section>

          {/* Image count indicator */}
          {images.length > 0 && (
            <div className="bg-admin-surface border border-admin-border rounded-admin-card px-4 py-3 flex items-center justify-between">
              <span className="text-[12px] text-admin-text-secondary font-medium">
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">photo_library</span>
                {images.length} image{images.length !== 1 ? 's' : ''} ready to upload
              </span>
              <button
                type="button"
                onClick={() => { images.forEach(i => URL.revokeObjectURL(i.preview)); setImages([]); }}
                className="text-admin-text-muted hover:text-admin-danger text-[11px] font-bold uppercase tracking-wide transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

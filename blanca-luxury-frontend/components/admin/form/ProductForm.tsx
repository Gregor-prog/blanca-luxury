'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormCard } from './FormCard';
import { TagInput, ImageDropZone } from './CustomInputs';

interface ProductFormProps {
  initialData?: any;
  mode: 'add' | 'edit';
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    style: initialData?.style || 'Brutalist',
    type: initialData?.type || 'Seating',
    origin: initialData?.origin || 'Milan, Italy',
    materials: initialData?.materials || '',
    dimensions: initialData?.dimensions || '',
    leadTime: initialData?.leadTime || '8-12 Weeks (Made to Order)',
    price: initialData?.price || '4,250,000',
    isPriceOnRequest: initialData?.isPriceOnRequest ?? true,
    status: initialData?.status || 'Draft',
    isFeatured: initialData?.isFeatured || false,
    category: initialData?.category || 'Furniture',
    showroom: initialData?.showroom || 'Not Displayed',
    collection: initialData?.collection || 'Obsidian Foundation',
    tags: initialData?.tags || ['Lounge', 'Leather'],
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    seoKeywords: initialData?.seoKeywords || ['Modern Design', 'Bespoke']
  });

  const [lastSaved, setLastSaved] = useState('Just now');

  // Slug Auto-generation
  useEffect(() => {
    if (mode === 'add' || !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, mode]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto min-h-screen pb-20">
      {/* Left Column: Primary Content (65%) */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* CARD 1 — Basic Info */}
        <FormCard label="BASIC INFORMATION">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="admin-label">Product Name</label>
              <input 
                className="admin-input !h-[48px] text-[16px] font-medium" 
                placeholder="e.g. Obsidian Lounge Chair"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="admin-label">URL Slug</label>
              <div className="relative">
                <input 
                  className="admin-input !bg-admin-surface-elevated/50 font-mono text-[13px] text-admin-text-muted" 
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-admin-text-muted">link</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="admin-label uppercase">Description</label>
                <div className="flex gap-1 border border-admin-border/30 rounded-[4px] p-1 scale-90">
                  {['format_bold', 'format_italic', 'format_list_bulleted', 'link'].map(icon => (
                    <button key={icon} className="p-1.5 text-admin-text-muted hover:text-admin-gold transition-colors">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              <textarea 
                className="admin-input h-[200px] py-4 resize-none leading-relaxed text-[14px]"
                placeholder="Describe the masterpiece..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </div>
        </FormCard>

        {/* CARD 2 — Details */}
        <FormCard label="PRODUCT DETAILS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="admin-label">Style</label>
              <select 
                className="admin-input appearance-none bg-[#1A1916]"
                value={formData.style}
                onChange={(e) => handleChange('style', e.target.value)}
              >
                <option>Contemporary</option>
                <option>Minimalist</option>
                <option>Brutalist</option>
                <option>Classic</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="admin-label">Type</label>
              <select className="admin-input bg-[#1A1916]">
                <option>Sofa</option>
                <option>Seating</option>
                <option>Dining Table</option>
                <option>Lighting</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="admin-label">Origin</label>
              <select className="admin-input bg-[#1A1916]">
                <option>Italy</option>
                <option>Turkey</option>
                <option>Denmark</option>
                <option>Nigeria</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="admin-label">Materials</label>
              <input className="admin-input" placeholder="e.g. Charred Oak, Aniline Leather" value={formData.materials} onChange={(e)=>handleChange('materials', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="admin-label">Dimensions</label>
              <input className="admin-input" placeholder="W × D × H cm" value={formData.dimensions} onChange={(e)=>handleChange('dimensions', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="admin-label">Lead Time</label>
              <input className="admin-input" placeholder="e.g. 4-6 Weeks" value={formData.leadTime} onChange={(e)=>handleChange('leadTime', e.target.value)} />
            </div>
          </div>
        </FormCard>

        {/* CARD 3 — Pricing */}
        <FormCard label="PRICING">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-2">
              <label className="admin-label">Listing Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-muted font-bold">₦</span>
                <input 
                  className={`admin-input pl-10 text-[18px] font-bold ${formData.isPriceOnRequest ? 'opacity-30 grayscale' : ''}`}
                  disabled={formData.isPriceOnRequest}
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-admin-surface-elevated/30 p-4 rounded-[8px] border border-admin-border/30">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary">Price on Request</span>
                <span className="text-[11px] text-admin-text-muted">Hide price, show 'Inquire' button</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.isPriceOnRequest}
                  onChange={(e) => handleChange('isPriceOnRequest', e.target.checked)}
                />
                <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold"></div>
              </label>
            </div>
          </div>
        </FormCard>

        {/* CARD 4 — Media */}
        <FormCard label="PRODUCT MEDIA">
          <div className="grid grid-cols-1 gap-6">
            <ImageDropZone title="Drop primary image here" />
            
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="aspect-square border border-admin-border/30 rounded-[4px] bg-admin-surface-elevated/20 flex items-center justify-center text-admin-text-muted hover:text-admin-gold cursor-pointer transition-colors group">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110">add</span>
                </div>
              ))}
              <div className="aspect-square border-2 border-dashed border-admin-border/30 rounded-[4px] flex flex-col items-center justify-center text-[10px] font-bold text-admin-text-muted uppercase tracking-widest hover:border-admin-gold transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px] mb-1">add_circle</span>
                More
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="admin-label">Atmosphere Video URL (Optional)</label>
              <input className="admin-input" placeholder="YouTube or Vimeo URL..." />
            </div>
          </div>
        </FormCard>

        {/* CARD 5 — SEO / Meta */}
        <FormCard label="SEO & META" isCollapsible>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label">Meta Title</label>
              <input className="admin-input" placeholder="Search engine title..." value={formData.metaTitle} onChange={(e)=>handleChange('metaTitle', e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="admin-label">Meta Description</label>
                <span className="text-[10px] text-admin-text-muted">{formData.metaDescription.length}/160</span>
              </div>
              <textarea 
                className="admin-input h-[100px] py-3 resize-none" 
                maxLength={160}
                placeholder="Search engine description..."
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
              />
            </div>
            <TagInput 
              label="Keywords" 
              tags={formData.seoKeywords} 
              setTags={(tags) => handleChange('seoKeywords', tags)} 
            />
          </div>
        </FormCard>
      </div>

      {/* Right Column: Sticky Settings (35%) */}
      <div className="lg:w-[400px] flex-shrink-0">
        <div className="sticky top-24 space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
          {/* Settings Card */}
          <section className="bg-admin-surface border border-admin-border rounded-admin-card p-6 flex flex-col gap-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="admin-label !mb-0">Status</span>
                <div className="flex items-center gap-2 bg-admin-surface-elevated px-3 py-1.5 rounded-[4px] border border-admin-border/50">
                  <span className={`w-2 h-2 rounded-full ${formData.status === 'Active' ? 'bg-admin-success' : formData.status === 'Draft' ? 'bg-admin-warning' : 'bg-admin-danger'} shadow-sm`}></span>
                  <select 
                    className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-admin-text-primary outline-none cursor-pointer"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-admin-border/20 pt-6">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-admin-text-primary">Featured Product</span>
                  <span className="text-[11px] text-admin-text-muted mt-0.5">Showcase on homepage</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.isFeatured}
                    onChange={(e) => handleChange('isFeatured', e.target.checked)}
                  />
                  <div className="w-10 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold"></div>
                </label>
              </div>

              <div className="space-y-6 border-t border-admin-border/20 pt-6">
                <div className="space-y-2">
                  <label className="admin-label">Category</label>
                  <select className="admin-input bg-[#1A1916]">
                    <option>Sofa</option>
                    <option>Furniture</option>
                    <option>Lighting</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="admin-label">Showroom</label>
                  <select className="admin-input bg-[#1A1916]">
                    <option>Lagos Flagship</option>
                    <option>Milano Central</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="admin-label">Collection</label>
                  <select className="admin-input bg-[#1A1916]">
                    <option>Obsidian Foundation</option>
                    <option>Vesper Series</option>
                  </select>
                </div>
                <TagInput 
                  label="Assign Tags" 
                  tags={formData.tags} 
                  setTags={(tags) => handleChange('tags', tags)} 
                />
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button className="w-full bg-admin-surface-elevated border border-admin-border text-admin-text-primary h-[48px] font-bold text-[12px] uppercase tracking-widest rounded-admin-input hover:bg-admin-surface-elevated/80 transition-all">
                Save Draft
              </button>
              <button className="admin-button-gold !h-[48px] font-bold uppercase tracking-[0.15em]">
                Publish Changes
              </button>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[11px] text-admin-text-muted flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                  Auto-saved {lastSaved}
                </span>
                <Link href="#" className="text-[12px] font-bold text-admin-gold hover:underline flex items-center gap-1 transition-all uppercase tracking-widest">
                  View on Site <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

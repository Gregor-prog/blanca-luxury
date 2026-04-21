'use client';

import React, { useState, useEffect } from 'react';

interface CollectionData {
  name?: string;
  slug?: string;
  badgeText?: string;
  year?: string;
  showroom?: string;
  description?: string;
  isFeatured?: boolean;
  status?: string;
}

interface AddCollectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CollectionData;
}

export function AddCollectionPanel({ isOpen, onClose, initialData }: AddCollectionPanelProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    badgeText: initialData?.badgeText || '',
    year: initialData?.year || '2025',
    showroom: initialData?.showroom || 'LAGOS',
    description: initialData?.description || '',
    isFeatured: initialData?.isFeatured || false,
    status: initialData?.status || 'Draft'
  });

  const [isLoading, setIsLoading] = useState(false);

  // Slug Auto-generation
  useEffect(() => {
    if (!initialData) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside 
        className={`fixed right-0 top-0 w-full max-w-[480px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">
            {initialData ? 'Edit Collection' : 'Add New Collection'}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label">Collection Name</label>
              <input 
                className="admin-input" 
                placeholder="e.g. The Obsidian Line" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Slug</label>
              <input 
                className="admin-input !bg-admin-surface-elevated/20 font-mono text-[13px]" 
                readOnly 
                value={formData.slug} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="admin-label">Badge Text</label>
                <input 
                  className="admin-input" 
                  placeholder="NEW ARRIVAL" 
                  value={formData.badgeText}
                  onChange={(e) => handleChange('badgeText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Year</label>
                <input 
                  className="admin-input" 
                  placeholder="2025" 
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Showroom Assignment</label>
              <select 
                className="admin-input bg-[#1D1B19]"
                value={formData.showroom}
                onChange={(e) => handleChange('showroom', e.target.value)}
              >
                <option value="LAGOS">LAGOS</option>
                <option value="MILANO">MILANO</option>
                <option value="LONDON">LONDON</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Description</label>
              <textarea 
                className="admin-input h-auto min-h-[100px] py-3 resize-none" 
                placeholder="Editorial summary..." 
                rows={3} 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-admin-border/20 pt-8">
            <label className="admin-label">Cover Image</label>
            <div className="border-2 border-dashed border-admin-border/40 rounded-[8px] p-10 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-admin-gold/50 transition-all">
              <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
              <p className="text-[13px] font-medium text-admin-text-primary mb-1">Upload editorial cover</p>
              <p className="text-[11px] text-admin-text-muted">High resolution (Max 5MB)</p>
            </div>
          </div>

          <div className="space-y-6 border-t border-admin-border/20 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary">Featured on Homepage</span>
                <span className="text-[11px] text-admin-text-muted">Highlight this collection in the main site strip.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange('isFeatured', e.target.checked)}
                />
                <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Initial Status</label>
              <div className="grid grid-cols-3 gap-2">
                {['Draft', 'Live', 'Archived'].map(s => (
                  <button 
                    key={s}
                    onClick={() => handleChange('status', s)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-[4px] border transition-all ${
                      formData.status === s 
                      ? 'bg-admin-gold border-admin-gold text-admin-bg' 
                      : 'border-admin-border/50 text-admin-text-muted hover:border-admin-gold/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-admin-border/50 bg-admin-surface-elevated/30 sticky bottom-0 z-10">
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="admin-button-gold uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : initialData ? 'Update Collection' : 'Create Collection'}
          </button>
        </div>
      </aside>
    </>
  );
}

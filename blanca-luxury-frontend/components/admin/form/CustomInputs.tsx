'use client';

import React, { useState } from 'react';

interface TagInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, tags, setTags, placeholder = 'Add tag...' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="admin-label">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span key={tag} className="bg-admin-surface-elevated border border-admin-gold/30 px-3 py-1 rounded-[4px] text-[12px] text-admin-text-primary flex items-center gap-2">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-admin-text-muted hover:text-admin-danger transition-colors">
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </span>
        ))}
      </div>
      <input 
        className="admin-input" 
        placeholder={placeholder} 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

interface ImageDropZoneProps {
  onUpload?: (file: File) => void;
  title: string;
  height?: string;
}

export function ImageDropZone({ title, height = '200px' }: ImageDropZoneProps) {
  return (
    <div 
      className={`border-2 border-dashed border-admin-border/40 rounded-admin-card flex flex-col items-center justify-center gap-2 bg-admin-surface-elevated/10 hover:border-admin-gold/50 hover:bg-admin-surface-elevated/20 transition-all cursor-pointer group`}
      style={{ height }}
    >
      <span className="material-symbols-outlined text-[32px] text-admin-gold transition-transform group-hover:scale-110">add_a_photo</span>
      <div className="text-center">
        <p className="text-[14px] font-medium text-admin-text-primary">{title}</p>
        <p className="text-[11px] text-admin-text-muted">or <span className="text-admin-gold">click to browse</span></p>
      </div>
    </div>
  );
}

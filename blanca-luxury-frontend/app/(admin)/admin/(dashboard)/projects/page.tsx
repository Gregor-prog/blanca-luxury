'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGetAdminProjectsQuery, useDeleteProjectMutation } from '@/lib/store';
import type { ProjectListItem, ProjectSector } from '@/lib/types';

const SECTORS: Array<{ label: string; value: ProjectSector | 'ALL' }> = [
  { label: 'All', value: 'ALL' },
  { label: 'Residential', value: 'RESIDENTIAL' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Hospitality', value: 'HOSPITALITY' },
  { label: 'Medical', value: 'MEDICAL' },
  { label: 'Government', value: 'GOVERNMENT' },
];

const SECTOR_LABELS: Record<ProjectSector, string> = {
  RESIDENTIAL: 'Residential',
  COMMERCIAL: 'Commercial',
  HOSPITALITY: 'Hospitality',
  MEDICAL: 'Medical',
  GOVERNMENT: 'Government',
};

function ProjectCard({
  project,
  onDelete,
}: {
  project: ProjectListItem;
  onDelete: (id: string) => void;
}) {
  const primaryImage = project.media.find((m) => m.mediaType === 'IMAGE') ?? project.media[0];
  const imageUrl = project.coverImageUrl ?? primaryImage?.url ?? null;

  return (
    <article className="bg-admin-surface border border-admin-border rounded-[8px] overflow-hidden group hover:border-admin-gold/30 transition-all duration-300">
      {/* Cover */}
      <div className="relative w-full h-[180px] bg-admin-surface-elevated overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-admin-border">image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-admin-surface/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-wider bg-admin-gold/90 text-admin-bg">
            {SECTOR_LABELS[project.sector]}
          </span>
          {project.isFeatured && (
            <span className="px-2 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-wider bg-admin-surface/80 text-admin-gold border border-admin-gold/40">
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className={`w-2 h-2 rounded-full inline-block ${project.isActive ? 'bg-admin-success' : 'bg-admin-text-muted'}`} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-[14px] font-medium text-admin-text-primary mb-1 leading-snug line-clamp-2">{project.title}</h3>
        <div className="flex items-center gap-3 text-[11px] text-admin-text-muted mb-4">
          {project.location && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">location_on</span>
              {project.location}
            </span>
          )}
          {project.year && <span>{project.year}</span>}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-admin-border/20">
          <div className="flex items-center divide-x divide-admin-border/30">
            <button className="pr-3 text-[11px] font-bold text-admin-gold hover:opacity-80 transition-opacity uppercase tracking-tight">
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="px-3 text-[11px] font-bold text-admin-danger hover:opacity-80 transition-opacity uppercase tracking-tight"
            >
              Delete
            </button>
          </div>
          <span className="text-[10px] text-admin-text-muted font-medium">
            {project.media.length} media
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [sectorFilter, setSectorFilter] = useState<ProjectSector | 'ALL'>('ALL');
  const [deleteProject] = useDeleteProjectMutation();

  const { data, isLoading, isError } = useGetAdminProjectsQuery(
    sectorFilter !== 'ALL' ? { sector: sectorFilter } : {}
  );

  const projects = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await deleteProject(id);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-admin-border/20 pb-10">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-admin-text-primary mb-1">Projects</h2>
          <p className="text-[12px] text-admin-text-secondary font-medium">
            Portfolio projects across all sectors · {total} total
          </p>
        </div>
        <button className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[8px] text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(201,169,110,0.15)]">
          Add Project
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div className="flex bg-admin-surface border border-admin-border/30 p-1 rounded-[6px] gap-1">
          {SECTORS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSectorFilter(s.value)}
              className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-[4px] transition-all whitespace-nowrap ${
                sectorFilter === s.value
                  ? 'bg-admin-surface-elevated text-admin-gold'
                  : 'text-admin-text-muted hover:text-admin-text-primary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-admin-text-secondary">Loading projects...</p>
        </div>
      ) : isError ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-admin-danger/30 mb-4">error</span>
          <p className="text-[14px] text-admin-text-secondary font-medium">Failed to load projects.</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-[64px] text-admin-gold/20 mb-4">image_not_supported</span>
          <p className="text-[14px] text-admin-text-secondary font-medium mb-2">No projects yet.</p>
          <p className="text-[12px] text-admin-text-muted">Add your first portfolio project to showcase your work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <div className="h-20" />
    </div>
  );
}

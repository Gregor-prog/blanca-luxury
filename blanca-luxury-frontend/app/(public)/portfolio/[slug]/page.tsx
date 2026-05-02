'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useGetProjectBySlugQuery } from '@/lib/store';

const SECTOR_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Residential',
  COMMERCIAL: 'Commercial',
  HOSPITALITY: 'Hospitality',
  MEDICAL: 'Medical',
  GOVERNMENT: 'Government',
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { data: project, isLoading, isError } = useGetProjectBySlugQuery(slug);
  const [activeIdx, setActiveIdx] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#1A1410]">
        <div className="w-12 h-12 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#1A1410] text-center px-4">
        <h1 className="font-serif italic text-[32px] md:text-[48px] text-[#C9A96E] tracking-tighter mb-4">
          Project Not Found
        </h1>
        <p className="font-sans text-[12px] text-[#8B7D72] mb-8 max-w-md leading-relaxed">
          This project may have been removed or is no longer available.
        </p>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#C9A96E] text-[#1A1410] text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  const images = project.media.filter((m) => m.mediaType === 'IMAGE');
  const allImages = [
    ...(project.coverImageUrl ? [{ id: 'cover', url: project.coverImageUrl }] : []),
    ...images.map((m) => ({ id: m.id, url: m.url })),
  ];
  const activeImage = allImages[activeIdx]?.url ?? '/placeholder.jpg';

  const metaItems = [
    project.location && { label: 'Location', value: project.location },
    project.year && { label: 'Year', value: String(project.year) },
    project.sector && { label: 'Sector', value: SECTOR_LABELS[project.sector] ?? project.sector },
    project.clientName && { label: 'Client', value: project.clientName },
  ].filter(Boolean) as { label: string; value: string }[];

  const whatsappMsg = encodeURIComponent(
    `Hello Blanca Luxury, I am interested in learning more about this project:\n\n*${project.title}*\nLink: https://blancaluxury.com/portfolio/${project.slug}`,
  );

  return (
    <div className="min-h-screen bg-[#1A1410] pt-24 pb-24 border-t border-[#C9A96E]/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.3em] text-[#8B7D72] mb-12">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-[#C9A96E] transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-[#C9A96E] truncate max-w-[200px] md:max-w-none">{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#131210] group border border-[#C9A96E]/10">
              <Image
                src={activeImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative aspect-square overflow-hidden bg-[#131210] transition-all duration-300 ${
                      activeIdx === idx ? 'ring-1 ring-[#C9A96E] opacity-100' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={`View ${idx + 1}`} fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2">

            <span className="block font-sans text-[9px] text-[#C9A96E] tracking-[0.4em] uppercase mb-4">
              {SECTOR_LABELS[project.sector] ?? project.sector}
            </span>

            <h1 className="font-serif italic text-[32px] md:text-[44px] text-white leading-[1.1] mb-5">
              {project.title}
            </h1>

            <div className="w-10 h-px bg-[#C9A96E]/50 mb-8" />

            {/* Meta grid */}
            {metaItems.length > 0 && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-10 pb-10 border-b border-[#C9A96E]/10">
                {metaItems.map(({ label, value }) => (
                  <div key={label}>
                    <h4 className="font-sans text-[9px] text-[#C9A96E] tracking-[0.3em] uppercase mb-1.5">{label}</h4>
                    <p className="font-sans text-[11px] text-white/80">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div className="font-sans text-[12px] leading-relaxed text-[#8B7D72]/90 mb-12">
                <p>{project.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto space-y-4">
              <a
                href={`https://wa.me/2348139910974?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#C9A96E] text-[#1A1410] font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#b5955a] transition-colors"
              >
                Enquire About This Project
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <Link
                href="/portfolio"
                className="w-full flex items-center justify-center gap-3 py-4 border border-[#C9A96E]/30 text-[#8B7D72] font-sans text-[11px] uppercase tracking-[0.2em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
              >
                ← All Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Full media gallery — show all remaining images below */}
        {images.length > 1 && (
          <div className="mt-24 pt-16 border-t border-[#C9A96E]/10">
            <p className="font-sans text-[10px] text-[#C9A96E] tracking-[0.35em] uppercase mb-10">
              Project Gallery
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    const idx = allImages.findIndex((img) => img.id === m.id);
                    if (idx !== -1) { setActiveIdx(idx); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                  }}
                  className="relative aspect-[4/3] overflow-hidden bg-[#131210] border border-[#C9A96E]/10 group cursor-pointer"
                >
                  <Image
                    src={m.url}
                    alt={m.caption ?? project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/30 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useGetProjectsQuery } from "@/lib/store";
import type { ProjectListItem } from "@/lib/types";

const SECTOR_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential", COMMERCIAL: "Commercial",
  GOVERNMENT: "Government",   HOSPITALITY: "Hospitality", MEDICAL: "Medical",
};

function coverUrl(p: ProjectListItem) {
  return p.coverImageUrl ?? p.media[0]?.url ?? null;
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="aspect-[4/3] bg-[#2a2520] rounded-sm mb-4" />
          <div className="h-3 w-20 bg-[#2a2520] rounded mb-2" />
          <div className="h-5 w-48 bg-[#2a2520] rounded" />
        </div>
      ))}
    </div>
  );
}

export function ProjectsTeaser() {
  const { data, isLoading } = useGetProjectsQuery({ limit: 3, isFeatured: true });
  const projects = data?.items ?? [];

  return (
    <section className="bg-[#1e1b15] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] text-[#C9A96E] tracking-[0.35em] uppercase mb-4">
            OUR WORK
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-white leading-tight">
            Selected Projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="font-sans text-[11px] text-[#C9A96E] tracking-widest uppercase border-b border-[#C9A96E]/50 pb-1 hover:opacity-70 transition-opacity whitespace-nowrap self-end"
        >
          View Portfolio →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} featured={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: ProjectListItem; featured: boolean }) {
  const img = coverUrl(project);
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group block ${featured ? "md:col-span-2 md:row-span-1" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-sm bg-[#2C2420] mb-4 ${featured ? "aspect-[16/9] md:aspect-[4/3]" : "aspect-[4/3]"}`}>
        {img ? (
          <img
            src={img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2C2420] to-[#1A1410]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="font-sans text-[9px] px-2 py-1 border border-[#C9A96E]/40 text-[#C9A96E] tracking-widest uppercase rounded-full">
            {SECTOR_LABELS[project.sector] ?? project.sector}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif italic text-white text-xl md:text-2xl group-hover:text-[#C9A96E] transition-colors duration-300">
            {project.title}
          </h3>
          {(project.location || project.year) && (
            <p className="font-sans text-[10px] text-[#8B7D72] tracking-widest uppercase mt-1">
              {[project.location, project.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <span className="font-sans text-[#C9A96E]/40 group-hover:text-[#C9A96E] transition-colors duration-300 mt-1">→</span>
      </div>
    </Link>
  );
}

function EmptyProjects() {
  return (
    <div className="text-center py-16">
      <p className="font-serif italic text-2xl text-[#8B7D72] mb-6">Portfolio coming soon</p>
      <Link href="/contact" className="font-sans text-[11px] text-[#C9A96E] uppercase tracking-widest border-b border-[#C9A96E]/50 pb-1">
        Discuss your project →
      </Link>
    </div>
  );
}

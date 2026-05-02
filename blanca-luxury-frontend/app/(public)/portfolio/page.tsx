"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetProjectsQuery } from "@/lib/store";
import type { ProjectSector, ProjectListItem } from "@/lib/types";

type FilterSector = ProjectSector | "ALL";

const SECTORS: FilterSector[] = [
  "ALL",
  "RESIDENTIAL",
  "COMMERCIAL",
  "GOVERNMENT",
  "HOSPITALITY",
  "MEDICAL",
];

const SECTOR_LABELS: Record<FilterSector, string> = {
  ALL: "All",
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  GOVERNMENT: "Government",
  HOSPITALITY: "Hospitality",
  MEDICAL: "Medical",
};

function coverUrl(project: ProjectListItem): string {
  return project.coverImageUrl ?? project.media[0]?.url ?? "/placeholder.jpg";
}

// ─── skeleton ─────────────────────────────────────────────────────────────────

function PortfolioSkeleton() {
  return (
    <section className="px-8 md:px-16 py-24 opacity-60">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-linear-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-size-[200%_100%] animate-[shimmer_2s_infinite] rounded-full mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 bg-linear-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-size-[200%_100%] animate-[shimmer_2s_infinite] rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterSector>("ALL");

  const { data, isLoading, isFetching } = useGetProjectsQuery(
    activeFilter !== "ALL" ? { sector: activeFilter } : {},
  );

  const projects = data?.items ?? [];
  const isSpinning = isLoading || isFetching;

  return (
    <main className="min-h-screen bg-[#fff8f1]">
      {/* Hero */}
      <section className="bg-[#1A1410] flex items-center px-8 md:px-16 overflow-hidden py-16 md:py-36">
        <div className="max-w-4xl space-y-6">
          <p className="text-[#C9A96E] font-bold font-sans text-[10px] tracking-[0.3em] uppercase">
            OUR WORK
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-serif italic font-light leading-tight">
            Portfolio of Excellence
          </h1>
          <p className="text-[#8B7D72] text-sm md:text-base font-sans max-w-lg leading-relaxed">
            From private residences to state institutions — every space tells a
            story of craftsmanship.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-[#fff8f1] py-5 px-4 md:px-16 top-24 z-40 border-b border-[#E8E0D5]/50">
        <div className="flex overflow-x-auto items-center gap-2 md:gap-4 max-w-7xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveFilter(sector)}
              className={`px-5 md:px-8 py-2 rounded-full font-sans text-[10px] tracking-wider uppercase transition-all whitespace-nowrap ${
                activeFilter === sector
                  ? "bg-[#C9A96E] font-bold text-[#1A1410]"
                  : "border border-[#C9A96E]/40 text-[#8B7D72] hover:bg-[#C9A96E]/5"
              }`}
            >
              {SECTOR_LABELS[sector]}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      {isSpinning ? (
        <PortfolioSkeleton />
      ) : projects.length === 0 ? (
        <section className="px-6 md:px-16 py-32 flex flex-col items-center text-center">
          <h2 className="font-serif text-[24px] italic text-[#1e1b15] mb-4">
            No projects found in this category.
          </h2>
          <button
            onClick={() => setActiveFilter("ALL")}
            className="font-sans text-[12px] font-bold text-[#C9A96E] uppercase tracking-widest hover:text-[#745a27] transition-colors border-b border-[#C9A96E] pb-1"
          >
            Explore all portfolios →
          </button>
        </section>
      ) : (
        <div className="py-12 md:py-16">
          {/* Featured project */}
          <section className="px-4 md:px-16 mb-16 md:mb-24 max-w-[1600px] mx-auto">
            <Link href={`/portfolio/${projects[0].slug}`} className="block relative w-full h-[450px] md:h-[650px] lg:h-[750px] rounded-lg overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${coverUrl(projects[0])}')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1A1410]/90 via-[#1A1410]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[#C9A96E] font-sans font-bold text-[10px] md:text-[11px] tracking-widest uppercase">
                    {[
                      projects[0].location,
                      projects[0].year,
                      SECTOR_LABELS[projects[0].sector] ?? projects[0].sector,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <h2 className="text-white text-3xl md:text-5xl font-serif italic">
                    {projects[0].title}
                  </h2>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <span className="block w-full md:w-auto px-8 md:px-10 py-3 md:py-4 border border-white text-white font-sans font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-[#1A1410] transition-all duration-500 text-center">
                    View Project →
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* Grid */}
          {projects.length > 1 && (
            <section className="px-4 md:px-16 mb-16 md:mb-24 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                {projects.slice(1).map((project) => (
                  <Link key={project.id} href={`/portfolio/${project.slug}`} className="group cursor-pointer block">
                    <div className="relative h-[350px] md:h-[480px] lg:h-[550px] rounded-lg overflow-hidden mb-5 md:mb-6">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${coverUrl(project)}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/40 transition-all duration-500 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-sans font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          View Project
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="pr-4">
                        <h3 className="text-[#2C2420] text-xl md:text-2xl font-serif italic mb-1">
                          {project.title}
                        </h3>
                        <p className="text-[#8B7D72] text-[10px] md:text-[11px] font-sans tracking-widest uppercase font-bold">
                          {[project.location, project.year]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <div className="px-3 py-1 border border-[#C9A96E]/40 text-[#C9A96E] font-sans text-[8px] md:text-[9px] tracking-widest uppercase font-bold rounded-full shrink-0">
                        {SECTOR_LABELS[project.sector] ?? project.sector}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Prestige Strip */}
      <section className="bg-[#1A1410] py-24 px-8 text-center border-y border-[#C9A96E]/10">
        <h2 className="text-white text-3xl md:text-4xl font-serif italic font-light mb-12">
          Trusted by Nigeria&apos;s Most Distinguished Addresses
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-5xl mx-auto">
          {[
            "Rivers State Government",
            "Julius Berger",
            "Gov. Seyi Makinde",
            "Dr. Peter Odili",
            "19 Residence Abuja",
          ].map((name, i, arr) => (
            <React.Fragment key={name}>
              <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">
                {name}
              </span>
              {i < arr.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Project, ProjectCategory, fetchProjects } from "../../lib/api";

const CATEGORIES: ProjectCategory[] = [
  'ALL', 'RESIDENTIAL', 'COMMERCIAL', 'GOVERNMENT', 'HOSPITALITY', 'MEDICAL'
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProjects(activeCategory).then((data) => {
      if (isMounted) {
        setProjects(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <main className="pt-24 min-h-screen bg-[#fff8f1]">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#1A1410] flex items-center px-8 md:px-16 overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <p className="text-[#C9A96E] font-bold font-sans text-[10px] tracking-[0.3em] uppercase">OUR WORK</p>
          <h1 className="text-white text-5xl md:text-7xl font-serif italic font-light leading-tight">
            Portfolio of Excellence
          </h1>
          <p className="text-[#8B7D72] text-sm md:text-base font-sans max-w-lg leading-relaxed">
            From private residences to state institutions — every space tells a story of craftsmanship.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-[#fff8f1] py-8 px-8 md:px-16 overflow-x-auto whitespace-nowrap no-scrollbar sticky top-24 z-40 border-b border-[#E8E0D5]/50">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full font-sans text-[10px] tracking-widest uppercase transition-all ${
                activeCategory === cat
                  ? "bg-[#C9A96E] font-bold text-[#1A1410]"
                  : "border border-[#C9A96E]/40 text-[#8B7D72] hover:bg-[#C9A96E]/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Content */}
      {isLoading ? (
        <section className="px-8 md:px-16 py-24 opacity-60">
          <div className="max-w-7xl mx-auto">
             <div className="h-8 w-48 bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-full mb-12"></div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="h-64 bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"></div>
               <div className="h-64 bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"></div>
               <div className="h-64 bg-gradient-to-r from-[#F0EBE3] via-[#E8E0D5] to-[#F0EBE3] bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"></div>
             </div>
          </div>
        </section>
      ) : projects.length === 0 ? (
        <section className="px-8 md:px-16 py-32 flex flex-col items-center text-center">
            <h2 className="font-serif text-[24px] italic text-[#1e1b15] mb-4">No projects found in this category.</h2>
            <button 
              onClick={() => setActiveCategory('ALL')} 
              className="font-sans text-[12px] font-bold text-[#C9A96E] uppercase tracking-widest hover:text-[#745a27] transition-colors border-b border-[#C9A96E] pb-1"
            >
              Explore all portfolios →
            </button>
        </section>
      ) : (
        <div className="py-16">
          {/* Featured Project */}
          <section className="px-8 md:px-16 mb-24 max-w-[1600px] mx-auto">
            <div className="relative w-full h-[520px] rounded-lg overflow-hidden group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: `url('${projects[0].imageUrl}')` }}
                title={projects[0].imageAlt}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/90 via-[#1A1410]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                  <p className="text-[#C9A96E] font-sans font-bold text-[11px] tracking-widest uppercase">
                    {projects[0].location} · {projects[0].year} · {projects[0].category}
                  </p>
                  <h2 className="text-white text-4xl md:text-5xl font-serif italic">
                    {projects[0].title}
                  </h2>
                </div>
                <div>
                  <button className="px-10 py-4 border border-white text-white font-sans font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-[#1A1410] transition-all duration-500">
                     View Project →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Grid Projects */}
          {projects.length > 1 && (
            <section className="px-8 md:px-16 mb-24 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                {projects.slice(1).map((project) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="relative h-[480px] rounded-lg overflow-hidden mb-6">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                        style={{ backgroundImage: `url('${project.imageUrl}')` }}
                        title={project.imageAlt}
                      ></div>
                      <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/40 transition-all duration-500 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-sans font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          View Project
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[#2C2420] text-2xl font-serif italic mb-1">{project.title}</h3>
                        <p className="text-[#8B7D72] text-[11px] font-sans tracking-widest uppercase font-bold">
                          {project.location} · {project.year}
                        </p>
                      </div>
                      <div className="px-3 py-1 border border-[#C9A96E]/40 text-[#C9A96E] font-sans text-[9px] tracking-widest uppercase font-bold rounded-full">
                         {project.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Prestige Strip */}
      <section className="bg-[#1A1410] py-24 px-8 text-center border-y border-[#C9A96E]/10">
        <h2 className="text-white text-3xl md:text-4xl font-serif italic font-light mb-12">
          Trusted by Nigeria's Most Distinguished Addresses
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-5xl mx-auto">
          <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">Rivers State Government</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
          <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">Julius Berger</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
          <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">Gov. Seyi Makinde</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
          <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">Dr. Peter Odili</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
          <span className="text-[#8B7D72] font-sans text-[11px] tracking-widest uppercase font-bold">19 Residence Abuja</span>
        </div>
      </section>
    </main>
  );
}

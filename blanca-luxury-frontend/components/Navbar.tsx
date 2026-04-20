"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Collections", path: "/collections" },
  { name: "Decor",       path: "/collections" },
  { name: "Spaces",      path: "/services/interior-design" },
  { name: "About",       path: "/about" },
  { name: "Contact",     path: "/contact" },
];

function isActive(linkPath: string, pathname: string) {
  if (linkPath === "/collections") return pathname.startsWith("/collections");
  return pathname.startsWith(linkPath);
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className={`fixed top-0 w-full z-60 transition-all duration-500 ${isMenuOpen ? "bg-[#FAF8F5]" : "bg-[#FAF8F5]/70 backdrop-blur-xl border-b border-[#D0C5B5]/20"}`}>
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="BLANCA LUXURY"
                width={200}
                height={65}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path, pathname);
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-body text-[12px] letter-spacing-nav transition-colors relative
                    ${active
                      ? "text-[#C9A96E] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#C9A96E]"
                      : "text-[#8B7D72] hover:text-[#2C2420]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Cluster */}
          <div className="flex items-center space-x-6">
            <Link
              href="/contact"
              className="hidden md:flex items-center px-6 py-2.5 bg-[#1A1410] text-white rounded-full font-body text-[12px] border-l-4 border-[#C9A96E] hover:opacity-90 transition-opacity"
            >
              Concierge ↗
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex md:hidden items-center text-[#2C2420] p-2 hover:bg-[#D0C5B5]/20 rounded-full transition-colors z-60"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[24px]" data-icon={isMenuOpen ? "close" : "menu"}>
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-[#FAF8F5] z-[55] transition-all duration-700 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col h-full bg-[#FAF8F5] px-8 pt-28 pb-8 overflow-y-auto">
          <div className="space-y-6">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.path, pathname);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-serif italic text-4xl transition-colors ${
                    active ? "text-[#C9A96E]" : "text-[#2C2420] hover:text-[#C9A96E]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto space-y-6 pt-8">
            <div className="h-px w-full bg-[#D0C5B5]/30" />
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8B7D72]">Our Locations</p>
              <p className="font-sans text-[13px] text-[#2C2420] tracking-widest uppercase">Port Harcourt · Lagos</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-[#1A1410] text-white rounded-full font-body text-[12px] text-center uppercase tracking-widest block"
              >
                Book Concierge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

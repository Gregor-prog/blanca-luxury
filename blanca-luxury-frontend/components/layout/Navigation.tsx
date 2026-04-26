"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Spaces",      href: "/services/interior-design" },
  { label: "Projects",    href: "/portfolio" },
  { label: "About",       href: "/about" },
  { label: "Contact",     href: "/contact" },
];

// ── Isomorphic layout effect (avoids SSR warning) ────────────────────────────
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── Main Component ────────────────────────────────────────────────────────────

export function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const pathname = usePathname();

  const logoRef  = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLAnchorElement>(null);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll detection — rAF-throttled
  useEffect(() => {
    let lastY  = window.scrollY;
    let rafId  = 0;
    let queued = false;

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(() => {
        const y     = window.scrollY;
        const delta = y - lastY;
        if (y > 80) {
          if (delta > 8)  setIsHidden(true);
          if (delta < -2) setIsHidden(false);
        } else {
          setIsHidden(false);
        }
        lastY  = y;
        queued = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  // GSAP entrance — set initial state before paint, animate after hero loads
  useIsoLayoutEffect(() => {
    const targets = collectTargets(logoRef, linksRef, ctaRef);
    gsap.set(targets, { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = collectTargets(logoRef, linksRef, ctaRef);
      gsap.to(targets, {
        clipPath: "inset(0 0% 0 0)",
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.08,
        delay: 1.2,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const fg = "var(--charcoal)";

  return (
    <>

      <nav
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          height:          72,
          zIndex:          50,
          display:         "flex",
          alignItems:      "center",
          paddingInline:   "var(--space-gutter)",
          backgroundColor: "var(--ivory)",
          borderBottom:    "1px solid #E8E0D4",
          transform:       isHidden ? "translateY(-100%)" : "translateY(0)",
          transition:      "background-color 600ms var(--ease-luxury), border-color 600ms var(--ease-luxury), transform 400ms var(--ease-luxury)",
        }}
      >
        {/* ── Logo ──────────────────────────────────────────── */}
        <Link ref={logoRef} href="/" className="blanca-logo" aria-label="Blanca Luxury — home">
          <Image
            src="/logo.png"
            alt="Blanca Luxury"
            width={120}
            height={40}
            style={{
              objectFit:  "contain",
              objectPosition: "left center",
              height:     40,
              width:      "auto",
              maxWidth:   120,
              filter:     "brightness(0.6) sepia(1) saturate(2)",
              transition: "filter 600ms var(--ease-luxury)",
            }}
            priority
          />
        </Link>

        {/* ── Center links (desktop) ────────────────────────── */}
        <div
          ref={linksRef}
          className="blanca-nav-links"
          style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", gap: 40 }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        {/* ── Right cluster ─────────────────────────────────── */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
          <Link ref={ctaRef} href="/contact" className="blanca-cta">
            Concierge ↗
          </Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="blanca-hamburger">
            <HamburgerIcon color={fg} />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// ── NavLink ───────────────────────────────────────────────────────────────────

function NavLink({ href, label }: { href: string; label: string }) {
  const barRef = useRef<HTMLSpanElement>(null);

  const enter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--charcoal)";
    if (barRef.current) barRef.current.style.width = "100%";
  };
  const leave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--stone)";
    if (barRef.current) barRef.current.style.width = "0";
  };

  return (
    <Link
      href={href}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        fontFamily:     "var(--font-body)",
        fontSize:       11,
        fontWeight:     400,
        letterSpacing:  "0.18em",
        textTransform:  "uppercase",
        textDecoration: "none",
        color:          "var(--stone)",
        position:       "relative",
        paddingBottom:  3,
        transition:     "color 300ms ease",
      }}
    >
      {label}
      <span
        ref={barRef}
        style={{
          position:        "absolute",
          bottom:          0,
          left:            0,
          width:           0,
          height:          1,
          backgroundColor: "var(--charcoal)",
          transition:      "width 300ms ease",
        }}
      />
    </Link>
  );
}

// ── HamburgerIcon ─────────────────────────────────────────────────────────────

function HamburgerIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true">
      <rect x="0" y="0"  width="18" height="1" fill={color} />
      <rect x="0" y="6"  width="18" height="1" fill={color} />
      <rect x="0" y="12" width="18" height="1" fill={color} />
    </svg>
  );
}

// ── MobileMenu ────────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      aria-hidden={!open}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          60,
        backgroundColor: "var(--espresso)",
        display:         "flex",
        flexDirection:   "column",
        padding:         "var(--space-gutter)",
        transform:       open ? "translateY(0)" : "translateY(-100%)",
        transition:      "transform 560ms var(--ease-luxury)",
        overflowY:       "auto",
        pointerEvents:   open ? "auto" : "none",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 400, letterSpacing: "0.35em", color: "var(--ivory)", textTransform: "uppercase" }}>
          BLANCA <span style={{ fontStyle: "italic" }}>LUXURY</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{ background: "none", border: "none", color: "var(--gold)", fontSize: 28, lineHeight: 1, padding: "4px 8px", cursor: "pointer" }}
        >
          ×
        </button>
      </div>

      {/* Links */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8 }}>
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{
              fontFamily:     "var(--font-display)",
              fontSize:       "clamp(36px, 8vw, 56px)",
              fontStyle:      "italic",
              fontWeight:     400,
              color:          "var(--ivory)",
              textDecoration: "none",
              letterSpacing:  "-0.01em",
              lineHeight:     1.1,
              opacity:        open ? 1 : 0,
              transform:      open ? "translateY(0)" : "translateY(20px)",
              transition:     `opacity 450ms ease ${120 + i * 90}ms, transform 450ms var(--ease-luxury) ${120 + i * 90}ms`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Footer info */}
      <div style={{ textAlign: "center", paddingBottom: 24 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--stone)", letterSpacing: "0.12em", marginBottom: 6 }}>
          +234 813 991 0974
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--stone)", letterSpacing: "0.12em" }}>
          @blanca_luxury
        </p>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function collectTargets(
  logoRef:  React.RefObject<HTMLAnchorElement | null>,
  linksRef: React.RefObject<HTMLDivElement | null>,
  ctaRef:   React.RefObject<HTMLAnchorElement | null>,
) {
  return [
    logoRef.current,
    ...(Array.from(linksRef.current?.children ?? []) as Element[]),
    ctaRef.current,
  ].filter(Boolean) as Element[];
}

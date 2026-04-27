'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SECTIONS = [
  {
    icon: 'grid_view',
    name: 'Collections',
    href: '/collections',
    tag: 'Browse',
    description:
      'Furniture, decor, drapery, and fragrances curated from Italy and Turkey. Filter by category or room type.',
  },
  {
    icon: 'architecture',
    name: 'Spaces',
    href: '/services/interior-design',
    tag: 'Design',
    description:
      'Our interior design service — from single-room refinements to full estate commissions. Residential, corporate, hospitality.',
  },
  {
    icon: 'photo_library',
    name: 'Projects',
    href: '/portfolio',
    tag: 'Portfolio',
    description:
      'Completed commissions across Port Harcourt, Lagos, and Abuja — government estates, private residences, hotels.',
  },
  {
    icon: 'auto_stories',
    name: 'About',
    href: '/about',
    tag: 'Story',
    description:
      '15+ years of excellence. Meet the team behind Blanca Luxury and learn what drives our design philosophy.',
  },
  {
    icon: 'concierge',
    name: 'Contact',
    href: '/contact',
    tag: 'Concierge',
    description:
      'Book a free design consultation, schedule a showroom visit, or send a bespoke inquiry to our team.',
  },
];

interface Action {
  label: string;
  sub: string;
  href: string;
  external: boolean;
  icon?: string;
  svgIcon?: React.ReactNode;
}

const ACTIONS: Action[] = [
  {
    label: 'WhatsApp',
    sub: 'Fastest response — direct to team',
    href: 'https://wa.me/2348139910974',
    external: true,
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: 'Showrooms',
    sub: 'Lagos · Port Harcourt',
    href: '/contact',
    external: false,
    icon: 'location_on',
  },
  {
    label: 'Book Consultation',
    sub: 'Free — no obligation',
    href: '/contact',
    external: false,
    icon: 'calendar_month',
  },
];

export function SiteGuide() {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: press "?" to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) setOpen((v) => !v);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when panel open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Floating trigger button — bottom-left */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open site guide"
        style={{
          position: 'fixed',
          bottom: 40,
          left: 40,
          zIndex: 49,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'var(--espresso)',
          border: '1px solid rgba(201,169,110,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 300ms ease, transform 300ms ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.35)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          backgroundColor: 'rgba(26,20,16,0.65)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 400ms var(--ease-luxury)',
        }}
      />

      {/* Side panel */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100dvh',
          width: '100%',
          maxWidth: 480,
          zIndex: 71,
          backgroundColor: 'var(--espresso)',
          borderLeft: '1px solid rgba(201,169,110,0.20)',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 520ms var(--ease-luxury)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '32px 40px 28px',
            borderBottom: '1px solid rgba(201,169,110,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
              BLANCA LUXURY
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontStyle: 'italic', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1.2 }}>
              Site Guide
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--stone)', marginTop: 8, lineHeight: 1.5 }}>
              Find your way through our world.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close guide"
            style={{
              background: 'none',
              border: '1px solid rgba(201,169,110,0.25)',
              color: 'var(--stone)',
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 20,
              lineHeight: 1,
              flexShrink: 0,
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = 'var(--gold)';
              b.style.color = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = 'rgba(201,169,110,0.25)';
              b.style.color = 'var(--stone)';
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>

          {/* Navigation sections */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--stone)', textTransform: 'uppercase', marginBottom: 20 }}>
            Pages
          </p>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '16px 20px',
                    borderRadius: 6,
                    border: '1px solid transparent',
                    transition: 'background 200ms ease, border-color 200ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = 'rgba(201,169,110,0.06)';
                    el.style.borderColor = 'rgba(201,169,110,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = 'transparent';
                    el.style.borderColor = 'transparent';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    backgroundColor: 'rgba(201,169,110,0.10)',
                    border: '1px solid rgba(201,169,110,0.20)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--gold)' }}>
                      {s.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--ivory)', letterSpacing: '0.04em' }}>
                        {s.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 9,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        backgroundColor: 'rgba(201,169,110,0.12)',
                        padding: '2px 8px',
                        borderRadius: 2,
                      }}>
                        {s.tag}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--stone)', lineHeight: 1.6, margin: 0 }}>
                      {s.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--stone)', flexShrink: 0, marginTop: 2, transition: 'color 200ms ease' }}>
                    north_east
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: 'rgba(201,169,110,0.12)', margin: '28px 0' }} />

          {/* Quick actions */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--stone)', textTransform: 'uppercase', marginBottom: 16 }}>
            Quick Actions
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ACTIONS.map((a) => {
              const inner = (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 20px',
                    borderRadius: 6,
                    border: '1px solid rgba(201,169,110,0.18)',
                    backgroundColor: 'rgba(201,169,110,0.04)',
                    transition: 'background 200ms ease, border-color 200ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = 'rgba(201,169,110,0.10)';
                    el.style.borderColor = 'rgba(201,169,110,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = 'rgba(201,169,110,0.04)';
                    el.style.borderColor = 'rgba(201,169,110,0.18)';
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    backgroundColor: 'rgba(201,169,110,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}>
                    {a.svgIcon ? (
                      a.svgIcon
                    ) : (
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{a.icon}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--ivory)', margin: 0, marginBottom: 2 }}>{a.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--stone)', margin: 0 }}>{a.sub}</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--stone)' }}>arrow_forward</span>
                </div>
              );

              return a.external ? (
                <a key={a.label} href={a.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  {inner}
                </a>
              ) : (
                <Link key={a.label} href={a.href} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px 40px',
            borderTop: '1px solid rgba(201,169,110,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--stone)', margin: 0 }}>
            PH · Lagos · Abuja — Nigeria
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(139,125,114,0.5)', margin: 0, letterSpacing: '0.05em' }}>
            Press <kbd style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              padding: '2px 6px',
              border: '1px solid rgba(201,169,110,0.25)',
              borderRadius: 3,
              color: 'var(--stone)',
              backgroundColor: 'rgba(201,169,110,0.06)',
            }}>?</kbd> to toggle
          </p>
        </div>
      </aside>
    </>
  );
}

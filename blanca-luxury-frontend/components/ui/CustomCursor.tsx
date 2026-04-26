"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      ring.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    // State helpers
    const reset = () => {
      ring.style.width = "8px";
      ring.style.height = "8px";
      ring.style.borderRadius = "50%";
      ring.style.border = "none";
      ring.style.backgroundColor = "var(--gold, #C9A96E)";
      ring.style.mixBlendMode = "normal";
      dot.style.opacity = "1";
      label.style.opacity = "0";
      label.textContent = "";
    };

    const onInteractableEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.border = "1.5px solid var(--gold, #C9A96E)";
      ring.style.backgroundColor = "transparent";
      ring.style.mixBlendMode = "difference";
      dot.style.opacity = "0";
      label.style.opacity = "0";
    };

    const onImageEnter = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.border = "1px solid var(--gold, #C9A96E)";
      ring.style.backgroundColor = "rgba(26,20,16,0.7)";
      ring.style.mixBlendMode = "normal";
      dot.style.opacity = "0";
      label.style.opacity = "1";
      label.textContent = "VIEW";
    };

    const targets = () =>
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    const images = () => document.querySelectorAll<HTMLElement>("img, [data-cursor-image]");

    const bindListeners = () => {
      targets().forEach((el) => {
        el.addEventListener("mouseenter", onInteractableEnter);
        el.addEventListener("mouseleave", reset);
      });
      images().forEach((el) => {
        el.addEventListener("mouseenter", onImageEnter);
        el.addEventListener("mouseleave", reset);
      });
    };

    bindListeners();

    // Re-bind when DOM updates (e.g. route change)
    const observer = new MutationObserver(bindListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot / ring — both centered via -50% translate applied after position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--gold, #C9A96E)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-100px, -100px)",
          marginLeft: "-3px",
          marginTop: "-3px",
          transition: "opacity 150ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--gold, #C9A96E)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-100px, -100px)",
          marginLeft: "-4px",
          marginTop: "-4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 250ms var(--ease-luxury, cubic-bezier(0.25,0.1,0,1)), height 250ms var(--ease-luxury, cubic-bezier(0.25,0.1,0,1)), background-color 250ms ease, border 250ms ease",
          willChange: "transform",
        }}
      >
        <span
          ref={labelRef}
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-body, 'Helvetica Neue', sans-serif)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "var(--gold, #C9A96E)",
            opacity: 0,
            transition: "opacity 150ms ease",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </>
  );
}

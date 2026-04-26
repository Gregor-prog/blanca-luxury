"use client";

import { useLenis } from "@/lib/useLenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}

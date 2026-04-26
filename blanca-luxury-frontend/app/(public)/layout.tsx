import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/components/StoreProvider";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLANCA LUXURY | The Curated Sanctuary",
  description: "Curating spaces that breathe. BLANCA is a study in monochromatic textures and the quiet luxury of essentialism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Cormorant — display serif for headlines */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,300;1,400;1,600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased overflow-x-hidden min-h-full" style={{ paddingTop: 72 }}>
        <StoreProvider>
          <SmoothScroll>
            <GrainOverlay />
            <CustomCursor />
            <Navigation />
            {children}
            <Footer />
          </SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  );
}

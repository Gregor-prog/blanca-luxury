import type { Metadata } from "next";
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;700&family=Noto+Serif:wght@400;700&family=Manrope:wght@300;400;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface antialiased overflow-x-hidden min-h-full">
        {children}
      </body>
    </html>
  );
}

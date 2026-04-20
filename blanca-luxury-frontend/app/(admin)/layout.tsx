import type { Metadata } from 'next';
import { StoreProvider } from '@/components/StoreProvider';
import './admin/admin.css';

export const metadata: Metadata = {
  title: 'Blanca Luxury | Internal Dashboard Access',
  description: 'Authorized access to Blanca Luxury internal systems.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-admin-bg text-admin-text-primary" style={{ fontFamily: '"DM Sans", sans-serif' }}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

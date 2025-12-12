import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live AQI India - Real Time Air Quality Index',
  description: 'Check live AQI for Delhi, Mumbai, Bangalore and 250+ cities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}

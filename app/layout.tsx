import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live AQI India - Real Time Air Quality Index',
  description: 'Live AQI for Delhi, Mumbai, Bangalore and all Indian cities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.0/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body className="antialiased bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

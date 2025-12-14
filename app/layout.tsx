import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export const metadata: Metadata = {
  title: 'Live AQI India – Real-Time Air Quality Index',
  description:
    'Check live AQI across India. Real-time air quality data for Delhi, Mumbai, Bengaluru, Hyderabad and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80')",
        }}
      >
        {/* Dark overlay + blur */}
        <div className="min-h-screen backdrop-blur-md bg-black/40">
          {children}
        </div>
      </body>
    </html>
  );
}

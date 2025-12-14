import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export const metadata: Metadata = {
  title: 'Live AQI India – Real-Time Air Quality Index',
  description:
    'Live AQI across Indian cities in India. Search air quality by city with real-time data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            paddingTop: 16, // 👈 slight gap from browser top
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

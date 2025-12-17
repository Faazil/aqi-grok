import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// SEO Metadata optimized for AdSense approval
export const metadata: Metadata = {
  title: 'Live AQI India - Real-time Air Quality Index Updates',
  description: 'Monitor real-time Air Quality Index (AQI) data for major cities across India. Stay informed with accurate PM2.5, PM10, and environmental metrics.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Next.js Script component handles the AdSense snippet.
          'afterInteractive' strategy ensures the page loads fast 
          before the ad script initializes, which Google prefers.
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2115058796417473"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

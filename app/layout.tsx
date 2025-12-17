import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Metadata optimized for AdSense "Publisher Content" standards
export const metadata: Metadata = {
  title: 'Live AQI India - Real-time Air Quality Index Updates',
  description: 'Monitor real-time Air Quality Index (AQI) data for major cities across India. Stay informed with accurate PM2.5 and environmental health metrics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Next.js Script component ensures efficient ad loading */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2115058796417473"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

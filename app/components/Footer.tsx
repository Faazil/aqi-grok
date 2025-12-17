'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [year, setYear] = useState<number | string>("");

  // This ensures the date only renders on the client to avoid hydration errors
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full py-10 mt-10 border-t border-gray-800 bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6">
          <p className="text-sm">
            © {year || '2025'} AQI India Live. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-600">
            Real-time air quality monitoring for a healthier India.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/about-aqi" className="hover:text-white transition-colors">
            What is AQI?
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">
            Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

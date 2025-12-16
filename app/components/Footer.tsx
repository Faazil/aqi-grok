// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      width: '100%', 
      maxWidth: '1400px', 
      margin: '40px auto 20px auto', 
      padding: '20px 0', 
      borderTop: '1px solid #333',
      textAlign: 'center', 
      color: '#aaa',
      fontSize: '0.9em',
    }}>
      <div style={{ marginBottom: '10px' }}>
        Live AQI India © {new Date().getFullYear()}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {/* These links MUST be present for AdSense compliance */}
        <Link href="/about-aqi" style={{ color: '#bbb', textDecoration: 'none' }}>
          About AQI
        </Link>
        <Link href="/privacy-policy" style={{ color: '#bbb', textDecoration: 'none' }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" style={{ color: '#bbb', textDecoration: 'none' }}>
          Terms of Service
        </Link>
        <Link href="/disclaimer" style={{ color: '#bbb', textDecoration: 'none' }}>
          Disclaimer
        </Link>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '0.8em', opacity: 0.7 }}>
        Data Source: World Air Quality Index (WAQI) Project.
      </div>
    </footer>
  );
};

export default Footer;

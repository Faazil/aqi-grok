'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { ssr: false });

export default function HomePage() {
  const [search, setSearch] = useState('');
  const nationalAverage = 181;

  const worst = [
    { city: 'Delhi', aqi: 399 },
    { city: 'Pune', aqi: 232 },
    { city: 'Hyderabad', aqi: 185 },
    { city: 'Lucknow', aqi: 170 },
    { city: 'Kolkata', aqi: 162 },
  ];

  const best = [
    { city: 'Chennai', aqi: 82 },
    { city: 'Bengaluru', aqi: 105 },
    { city: 'Ahmedabad', aqi: 153 },
    { city: 'Mumbai', aqi: 158 },
    { city: 'Jaipur', aqi: 160 },
  ];

  const searchCity = () => {
    if (!search.trim()) return;
    alert(`Search triggered for ${search}`);
  };

  // simple visitor counter (frontend-only, safe)
  useEffect(() => {
    const key = 'aqiindia-visits-' + new Date().toDateString();
    const count = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, String(count));
    const el = document.getElementById('visitor-count');
    if (el) el.innerText = count.toString();
  }, []);

  return (
    <main
      style={{
        maxWidth: '100vw',
        minHeight: '100vh',
        padding: '24px',
        overflowX: 'hidden',
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* GRID LAYOUT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 380px',
          alignItems: 'start',
          gap: 32,
        }}
      >
        {/* LEFT – TOP 5 */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: 12 }}>🚨 Worst AQI (Top 5)</h3>
          {worst.map((w) => (
            <div
              key={w.city}
              style={{
                background: '#dc2626',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: 14,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 600,
              }}
            >
              <span>{w.city}</span>
              <span>{w.aqi}</span>
            </div>
          ))}

          <h3 style={{ color: '#fff', margin: '22px 0 12px' }}>
            🌿 Best AQI (Top 5)
          </h3>
          {best.map((b) => (
            <div
              key={b.city}
              style={{
                background:
                  b.aqi < 100 ? '#16a34a' : b.aqi < 150 ? '#facc15' : '#fb923c',
                color: '#000',
                padding: '12px 16px',
                borderRadius: 14,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 600,
              }}
            >
              <span>{b.city}</span>
              <span>{b.aqi}</span>
            </div>
          ))}
        </div>

        {/* CENTER – LIVE AQI */}
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: 46, marginBottom: 18 }}>
            Live AQI India
          </h1>

          <div
            style={{
              background: '#fff',
              color: '#4f46e5',
              display: 'inline-block',
              padding: '28px 48px',
              borderRadius: 22,
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              marginBottom: 22,
            }}
          >
            <div style={{ fontSize: 58, fontWeight: 800 }}>
              {nationalAverage}
            </div>
            <div style={{ fontSize: 14 }}>National Average AQI</div>
          </div>

          {/* SEARCH */}
          <div style={{ marginBottom: 12 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any Indian city..."
              style={{
                width: 460,
                maxWidth: '90%',
                padding: '14px 18px',
                borderRadius: 16,
                border: 'none',
                outline: 'none',
                fontSize: 15,
              }}
            />
            <button
              onClick={searchCity}
              style={{
                marginLeft: 10,
                padding: '14px 28px',
                borderRadius: 16,
                border: 'none',
                background: '#4f46e5',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </div>

          <div style={{ fontSize: 12, opacity: 0.8 }}>
            ● Live · Last updated 2:57 AM
          </div>
        </div>

        {/* RIGHT – VERTICAL MAP */}
        <div
          style={{
            height: '520px',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
          }}
        >
          <Map />
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 36,
          textAlign: 'center',
          fontSize: 12,
          opacity: 0.65,
          color: '#e5e7eb',
        }}
      >
        👁️ Visitors today: <span id="visitor-count">—</span>
      </footer>
    </main>
  );
}

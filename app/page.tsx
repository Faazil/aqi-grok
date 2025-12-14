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
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        padding: '28px',
        backgroundImage: 'url("/bg.jpg")',   // ✅ WILL WORK
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px minmax(520px, 1fr) 360px', // ⬅ pulled inward
          gap: 20,
          alignItems: 'start',
        }}
      >
        {/* LEFT */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: 12 }}>🚨 Worst AQI (Top 5)</h3>
          {worst.map((w) => (
            <div
              key={w.city}
              style={{
                background: '#dc2626',
                color: '#fff',
                padding: '12px 14px',
                borderRadius: 14,
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 600,
              }}
            >
              <span>{w.city}</span>
              <span>{w.aqi}</span>
            </div>
          ))}

          <h3 style={{ color: '#fff', margin: '18px 0 10px' }}>
            🌿 Best AQI (Top 5)
          </h3>
          {best.map((b) => (
            <div
              key={b.city}
              style={{
                background:
                  b.aqi < 100 ? '#16a34a' : b.aqi < 150 ? '#facc15' : '#fb923c',
                color: '#000',
                padding: '12px 14px',
                borderRadius: 14,
                marginBottom: 8,
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

        {/* CENTER */}
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: 46, marginBottom: 14 }}>
            Live AQI India
          </h1>

          <div
            style={{
              background: '#fff',
              color: '#4f46e5',
              padding: '34px 58px',
              borderRadius: 24,
              display: 'inline-block',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 800 }}>
              {nationalAverage}
            </div>
            <div style={{ fontSize: 14 }}>National Average AQI</div>
          </div>

          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any Indian city..."
              style={{
                width: 520,
                maxWidth: '95%',
                padding: '14px 18px',
                borderRadius: 16,
                border: 'none',
                outline: 'none',
              }}
            />
            <button
              style={{
                marginLeft: 10,
                padding: '14px 26px',
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

          <div style={{ fontSize: 12, marginTop: 6 }}>
            ● Live · Last updated 2:57 AM
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            height: '640px',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 18px 44px rgba(0,0,0,0.55)',
          }}
        >
          <Map />
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          position: 'fixed',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 15,
          color: '#e5e7eb',
        }}
      >
        👁️ Visitors today: <strong id="visitor-count">—</strong>
      </div>
    </main>
  );
}

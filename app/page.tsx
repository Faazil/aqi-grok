'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const cities: CityData[] = [
  { name: 'Delhi', aqi: 399, level: 'Severe', lat: 28.61, lng: 77.20 },
  { name: 'Pune', aqi: 232, level: 'Poor', lat: 18.52, lng: 73.85 },
  { name: 'Hyderabad', aqi: 185, level: 'Moderate', lat: 17.38, lng: 78.48 },
  { name: 'Lucknow', aqi: 170, level: 'Moderate', lat: 26.84, lng: 80.94 },
  { name: 'Kolkata', aqi: 162, level: 'Moderate', lat: 22.57, lng: 88.36 },
];

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <main className="page">
      <div className="layout">
        {/* LEFT */}
        <aside className="panel">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {cities.map((c) => (
            <div
              key={c.name}
              className="aqi-row"
              style={{ background: '#dc2626' }}
            >
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}

          <h3 style={{ marginTop: 24 }}>🌱 Best AQI (Top 5)</h3>
          {[
            { name: 'Chennai', aqi: 82 },
            { name: 'Bengaluru', aqi: 105 },
            { name: 'Ahmedabad', aqi: 153 },
            { name: 'Mumbai', aqi: 158 },
            { name: 'Jaipur', aqi: 160 },
          ].map((c) => (
            <div
              key={c.name}
              className="aqi-row"
              style={{ background: '#16a34a' }}
            >
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <section className="center">
          <h1>Live AQI India</h1>

          <div className="aqi-card">
            <div className="value">181</div>
            <div className="label">National Average AQI</div>
          </div>

          <div className="search-box">
            <input
              placeholder="Search any Indian city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>

          <div className="meta">● Live · Last updated 2:57 AM</div>
          <div className="visitors">👁 Visitors today: 8</div>
        </section>

        {/* RIGHT */}
        <aside>
          <AqiMap cityData={cities} />
        </aside>
      </div>
    </main>
  );
}

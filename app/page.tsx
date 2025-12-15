'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const cities: CityData[] = [
  { name: 'Delhi', aqi: 399, level: 'Severe', lat: 28.6139, lng: 77.209 },
  { name: 'Pune', aqi: 232, level: 'Poor', lat: 18.5204, lng: 73.8567 },
  { name: 'Hyderabad', aqi: 185, level: 'Moderate', lat: 17.385, lng: 78.4867 },
  { name: 'Lucknow', aqi: 170, level: 'Moderate', lat: 26.8467, lng: 80.9462 },
  { name: 'Kolkata', aqi: 162, level: 'Moderate', lat: 22.5726, lng: 88.3639 },
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
            <div key={c.name} className="aqi-row bg-red-600">
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}

          <h3 className="mt-4">🌱 Best AQI (Top 5)</h3>
          {[
            { name: 'Chennai', aqi: 82 },
            { name: 'Bengaluru', aqi: 105 },
            { name: 'Ahmedabad', aqi: 153 },
            { name: 'Mumbai', aqi: 158 },
            { name: 'Jaipur', aqi: 160 },
          ].map((c) => (
            <div key={c.name} className="aqi-row bg-green-600">
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <section className="center">
          <h1 className="text-3xl font-bold">Live AQI India</h1>

          <div className="aqi-card">
            <div className="text-4xl font-bold">181</div>
            <div className="text-sm mt-1">National Average AQI</div>
          </div>

          <div className="search-box">
            <input
              placeholder="Search any Indian city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>

          <div className="text-xs mt-3 opacity-80">
            ● Live · Last updated 2:57 AM
          </div>

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

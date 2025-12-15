'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const CITY_DATA: CityData[] = [
  { name: 'Delhi', slug: 'delhi', aqi: 399, dominant: 'pm10', level: 'Hazardous', lat: 28.6139, lng: 77.209 },
  { name: 'Pune', slug: 'pune', aqi: 232, dominant: 'pm25', level: 'Very Unhealthy', lat: 18.5204, lng: 73.8567 },
  { name: 'Hyderabad', slug: 'hyderabad', aqi: 185, dominant: 'pm25', level: 'Unhealthy', lat: 17.385, lng: 78.4867 },
  { name: 'Lucknow', slug: 'lucknow', aqi: 170, dominant: 'pm25', level: 'Unhealthy', lat: 26.8467, lng: 80.9462 },
  { name: 'Kolkata', slug: 'kolkata', aqi: 162, dominant: 'pm25', level: 'Unhealthy', lat: 22.5726, lng: 88.3639 },

  { name: 'Chennai', slug: 'chennai', aqi: 82, dominant: 'pm25', level: 'Moderate', lat: 13.0827, lng: 80.2707 },
  { name: 'Bengaluru', slug: 'bengaluru', aqi: 105, dominant: 'pm25', level: 'Moderate', lat: 12.9716, lng: 77.5946 },
  { name: 'Ahmedabad', slug: 'ahmedabad', aqi: 153, dominant: 'pm25', level: 'Unhealthy', lat: 23.0225, lng: 72.5714 },
  { name: 'Mumbai', slug: 'mumbai', aqi: 158, dominant: 'pm25', level: 'Unhealthy', lat: 19.076, lng: 72.8777 },
  { name: 'Jaipur', slug: 'jaipur', aqi: 160, dominant: 'pm25', level: 'Unhealthy', lat: 26.9124, lng: 75.7873 },
];

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <main className="page-root">
      <div className="layout-grid">

        {/* LEFT COLUMN */}
        <aside className="left-panel">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {CITY_DATA.slice(0, 5).map(c => (
            <div key={c.slug} className="pill red">
              <span>{c.name}</span>
              <b>{c.aqi}</b>
            </div>
          ))}

          <h3 className="mt">🌿 Best AQI (Top 5)</h3>
          {CITY_DATA.slice(5).map(c => (
            <div key={c.slug} className="pill green">
              <span>{c.name}</span>
              <b>{c.aqi}</b>
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <section className="center-panel">
          <h1>Live AQI India</h1>

          <div className="aqi-box">
            <div className="aqi-number">181</div>
            <div className="aqi-label">National Average AQI</div>
          </div>

          <div className="search-row">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search any Indian city..."
            />
            <button>Search</button>
          </div>

          <p className="updated">• Live · Last updated 2:57 AM</p>
        </section>

        {/* RIGHT */}
        <aside className="map-panel">
          <AqiMap cityData={CITY_DATA} />
        </aside>

      </div>

      <footer className="visitors">
        👁 Visitors today: 8
      </footer>
    </main>
  );
}

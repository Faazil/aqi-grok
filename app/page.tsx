'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('../components/AqiMap'), { ssr: false });

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <main className="page">
      {/* Background */}
      <div className="bg-overlay" />

      {/* MAIN CONTAINER */}
      <div className="container">
        {/* LEFT COLUMN */}
        <aside className="left">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {[
            ['Delhi', 399],
            ['Pune', 232],
            ['Hyderabad', 185],
            ['Lucknow', 170],
            ['Kolkata', 162],
          ].map(([c, v]) => (
            <div key={c} className="card red">{c} <span>{v}</span></div>
          ))}

          <h3>🌱 Best AQI (Top 5)</h3>
          {[
            ['Chennai', 82],
            ['Bengaluru', 105],
            ['Ahmedabad', 153],
            ['Mumbai', 158],
            ['Jaipur', 160],
          ].map(([c, v]) => (
            <div key={c} className="card green">{c} <span>{v}</span></div>
          ))}
        </aside>

        {/* CENTER COLUMN */}
        <section className="center">
          <h1>Live AQI India</h1>

          <div className="avg-box">
            <div className="avg">181</div>
            <div className="label">National Average AQI</div>
          </div>

          <div className="search">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search any Indian city..."
            />
            <button>Search</button>
          </div>

          <div className="updated">• Live • Last updated 2:57 AM</div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="right">
          <Map />
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        👁️ Visitors today: <strong>8</strong>
      </footer>
    </main>
  );
}

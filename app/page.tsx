'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const AqiMap = dynamic(() => import('./components/AqiMap'), { ssr: false });

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <main className="page">
      <div className="layout">

        {/* LEFT COLUMN */}
        <aside className="left">
          <h3>🚨 Worst AQI (Top 5)</h3>
          <ul className="list worst">
            <li><span>Delhi</span><b>399</b></li>
            <li><span>Pune</span><b>232</b></li>
            <li><span>Hyderabad</span><b>185</b></li>
            <li><span>Lucknow</span><b>170</b></li>
            <li><span>Kolkata</span><b>162</b></li>
          </ul>

          <h3>🌱 Best AQI (Top 5)</h3>
          <ul className="list best">
            <li><span>Chennai</span><b>82</b></li>
            <li><span>Bengaluru</span><b>105</b></li>
            <li><span>Ahmedabad</span><b>153</b></li>
            <li><span>Mumbai</span><b>158</b></li>
            <li><span>Jaipur</span><b>160</b></li>
          </ul>
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any Indian city..."
            />
            <button>Search</button>
          </div>

          <div className="updated">● Live · Last updated 2:57 AM</div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="right">
          <AqiMap
            cityData={[
              { name: 'Delhi', aqi: 399, level: 'Severe', lat: 28.6139, lng: 77.209 },
              { name: 'Mumbai', aqi: 158, level: 'Moderate', lat: 19.076, lng: 72.8777 },
              { name: 'Bengaluru', aqi: 105, level: 'Moderate', lat: 12.9716, lng: 77.5946 },
              { name: 'Kolkata', aqi: 162, level: 'Unhealthy', lat: 22.5726, lng: 88.3639 },
              { name: 'Chennai', aqi: 82, level: 'Satisfactory', lat: 13.0827, lng: 80.2707 },
            ]}
          />
        </aside>
      </div>

      {/* ✅ FIXED VISITOR COUNT (BOTTOM CENTER) */}
      <div className="visitors">
        👁 Visitors today: 8
      </div>
    </main>
  );
}

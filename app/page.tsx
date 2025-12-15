'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('India');
  const [aqi, setAqi] = useState(181);
  const [dominant, setDominant] = useState('');
  const [updated, setUpdated] = useState('');
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    fetch('/api/visit')
      .then((r) => r.json())
      .then((d) => setVisitors(d.visits))
      .catch(() => {});
  }, []);

  async function handleSearch() {
    if (!query) return;

    try {
      const res = await fetch(`/api/india?city=${query}`);
      const data = await res.json();

      if (data.error) return;

      setCity(data.city);
      setAqi(data.aqi);
      setDominant(data.dominant);
      setUpdated(data.time);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {/* 🔴 EXISTING UI — UNCHANGED 🔴 */}

      <h1 className="title">Live AQI India</h1>

      <div className="aqi-box">
        <div className="aqi-value">{aqi}</div>
        <div className="aqi-label">National Average AQI</div>
      </div>

      <div className="search-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any Indian city..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="meta">
        <div>📍 {city}</div>
        {dominant && <div>Dominant pollutant: {dominant}</div>}
        {updated && <div>Updated: {updated}</div>}
      </div>

      <AqiMap />

      <div className="visitors">
        👁️ Visitors today: {visitors}
      </div>
    </>
  );
}

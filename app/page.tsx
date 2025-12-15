'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), { ssr: false });

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cityData, setCityData] = useState<CityData[]>([]);

  async function handleSearch() {
    if (!search) return;

    const res = await fetch(`/api/india?city=${encodeURIComponent(search)}`);
    const data = await res.json();

    if (!data || !data.lat || !data.lng) return;

    setCityData([
      {
        name: data.city,
        aqi: data.aqi,
        dominant: data.dominant,
        level: data.level,
        lat: data.lat,
        lng: data.lng,
      },
    ]);
  }

  return (
    <>
      {/* EXISTING HERO / TOP-5 UI REMAINS UNTOUCHED */}

      <div className="search-box">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search any Indian city..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <AqiMap cityData={cityData} />

      {/* visitor count untouched */}
    </>
  );
}

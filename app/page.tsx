'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const BASE_CITIES: Omit<CityData, 'aqi' | 'dominant' | 'level'>[] = [
  { name: 'Delhi', slug: 'delhi', lat: 28.6139, lng: 77.209 },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Bengaluru', slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.385, lng: 78.4867 },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', slug: 'jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', slug: 'lucknow', lat: 26.8467, lng: 80.9462 },
];

const TOKEN = process.env.NEXT_PUBLIC_WAQI_TOKEN;

function getAqiLevel(aqi: number | null) {
  if (!aqi) return '—';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export default function Home() {
  const [cityData, setCityData] = useState<CityData[]>(
    BASE_CITIES.map((c) => ({
      ...c,
      aqi: null,
      dominant: 'PM2.5',
      level: '—',
    }))
  );

  const [lastUpdated, setLastUpdated] = useState('—');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(() => {
    if (!TOKEN) return;

    const fetchData = async () => {
      const updated = await Promise.all(
        cityData.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`
            );
            const json = await res.json();
            const aqi = json?.data?.aqi ?? null;

            return {
              ...city,
              aqi,
              dominant: json?.data?.dominentpol || 'PM2.5',
              level: getAqiLevel(aqi),
            };
          } catch {
            return city;
          }
        })
      );

      setCityData(updated);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const valid = cityData.filter((c) => c.aqi !== null);
  const sorted = [...valid].sort((a, b) => (b.aqi ?? 0) - (a.aqi ?? 0));

  const topWorst = sorted.slice(0, 5);
  const topBest = [...sorted].reverse().slice(0, 5);

  const nationalAverage =
    valid.length > 0
      ? Math.round(valid.reduce((s, c) => s + (c.aqi || 0), 0) / valid.length)
      : '--';

  const searchCity = async () => {
    if (!search) return;
    const res = await fetch(
      `https://api.waqi.info/feed/${search}/?token=${TOKEN}`
    );
    const json = await res.json();
    setSearchResult(json.status === 'ok' ? json.data : null);
  };

  return (
    <>
      {/* TOP DASHBOARD */}
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 30,
        }}
      >
        {/* LEFT */}
        <div style={{ color: '#fff' }}>
          <h3>🚨 Worst AQI (Top 5)</h3>
          {topWorst.map((c) => (
            <div key={c.name} style={{ opacity: 0.9 }}>
              {c.name} — {c.aqi}
            </div>
          ))}

          <h3 style={{ marginTop: 20 }}>🌿 Best AQI (Top 5)</h3>
          {topBest.map((c) => (
            <div key={c.name} style={{ opacity: 0.9 }}>
              {c.name} — {c.aqi}
            </div>
          ))}
        </div>

        {/* RIGHT MAP */}
        <div
          style={{
            height: 420,
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <AqiMap cityData={cityData} />
        </div>
      </section>

      {/* CENTER INFO */}
      <section style={{ textAlign: 'center', color: '#fff', marginTop: 30 }}>
        <h1 style={{ fontSize: 40, fontWeight: 800 }}>Live AQI India</h1>

        <div
          style={{
            background: '#fff',
            color: '#4f46e5',
            display: 'inline-block',
            padding: '18px 30px',
            borderRadius: 18,
            marginTop: 12,
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 800 }}>
            {nationalAverage}
          </div>
          <div style={{ fontSize: 14 }}>National Average AQI</div>
        </div>

        {/* SEARCH */}
        <div style={{ marginTop: 20 }}>
          <input
            placeholder="Search any Indian city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              border: 'none',
              width: 260,
            }}
          />
          <button
            onClick={searchCity}
            style={{
              marginLeft: 8,
              padding: '10px 16px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>

        {searchResult && (
          <div style={{ marginTop: 12 }}>
            {searchResult.city.name} — AQI {searchResult.aqi}
          </div>
        )}

        <p style={{ fontSize: 12, opacity: 0.8, marginTop: 10 }}>
          ● Live • Last updated {lastUpdated}
        </p>
      </section>
    </>
  );
}

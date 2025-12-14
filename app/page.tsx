'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), { ssr: false });

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
  if (aqi <= 150) return 'Unhealthy (Sensitive)';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

function getAqiColor(aqi: number | null) {
  if (!aqi) return '#374151';
  if (aqi <= 50) return '#16a34a';
  if (aqi <= 100) return '#facc15';
  if (aqi <= 150) return '#fb923c';
  if (aqi <= 200) return '#dc2626';
  if (aqi <= 300) return '#7c3aed';
  return '#111827';
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

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState('—');

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
    const interval = setInterval(fetchData, 300000);
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
      {/* DASHBOARD GRID */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 20,
          display: 'grid',
          gridTemplateColumns: '360px 1fr 360px',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          <h3 style={{ color: '#fff' }}>🚨 Worst AQI (Top 5)</h3>
          {topWorst.map((c) => (
            <div
              key={c.name}
              style={{
                background: getAqiColor(c.aqi),
                color: '#fff',
                borderRadius: 14,
                padding: '14px 18px',
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
              }}
            >
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}

          <h3 style={{ color: '#fff', marginTop: 24 }}>
            🌿 Best AQI (Top 5)
          </h3>
          {topBest.map((c) => (
            <div
              key={c.name}
              style={{
                background: getAqiColor(c.aqi),
                color: '#fff',
                borderRadius: 14,
                padding: '14px 18px',
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
              }}
            >
              <span>{c.name}</span>
              <span>{c.aqi}</span>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN */}
        <div>
          <div
            style={{
              position: 'relative',
              height: 420,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            }}
          >
            <AqiMap cityData={cityData} />

            {/* OVERLAY */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                bottom: 20,
                background: 'rgba(255,255,255,0.95)',
                padding: '16px 20px',
                borderRadius: 16,
                textAlign: 'center',
                width: 220,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800 }}>
                Live AQI India
              </div>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#4f46e5' }}>
                {nationalAverage}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                National Average AQI
              </div>

              <div style={{ marginTop: 10 }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search city…"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 10,
                    border: '1px solid #ddd',
                  }}
                />
                <button
                  onClick={searchCity}
                  style={{
                    marginTop: 6,
                    width: '100%',
                    padding: '8px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#4f46e5',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Search
                </button>
              </div>

              {searchResult && (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  {searchResult.city.name} — AQI {searchResult.aqi}
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#fff', marginTop: 8 }}>
            ● Live • Last updated {lastUpdated}
          </div>
        </div>

        {/* RIGHT COLUMN (INTENTIONAL EMPTY SPACE) */}
        <div />
      </section>
    </>
  );
}

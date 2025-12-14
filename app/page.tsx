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
  if (!aqi) return 'Loading';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

function getAqiColor(aqi: number | null) {
  if (!aqi) return '#6b7280';
  if (aqi <= 50) return '#16a34a';
  if (aqi <= 100) return '#facc15';
  if (aqi <= 150) return '#f97316';
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
      level: 'Loading',
    }))
  );

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
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const valid = cityData.filter((c) => c.aqi !== null);

  const nationalAverage =
    valid.length > 0
      ? Math.round(valid.reduce((s, c) => s + (c.aqi || 0), 0) / valid.length)
      : '--';

  const sorted = [...valid].sort(
    (a, b) => (b.aqi ?? 0) - (a.aqi ?? 0)
  );

  const topWorst = sorted.slice(0, 5);
  const topBest = [...sorted].reverse().slice(0, 5);

  return (
    <>
      {/* HERO */}
      <header style={{ textAlign: 'center', padding: '70px 20px', color: '#fff' }}>
        <h1 style={{ fontSize: 52, fontWeight: 800 }}>
          Live AQI India
        </h1>
        <p style={{ fontSize: 20, opacity: 0.9 }}>
          Real-time Air Quality Dashboard
        </p>

        <div
          style={{
            background: '#fff',
            color: '#4f46e5',
            display: 'inline-block',
            padding: '22px 38px',
            borderRadius: 20,
            marginTop: 24,
            boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800 }}>
            {nationalAverage}
          </div>
          <div style={{ fontSize: 16 }}>
            {typeof nationalAverage === 'number'
              ? getAqiLevel(nationalAverage)
              : 'Loading'}
          </div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>
            National Average AQI
          </div>
        </div>

        <p style={{ marginTop: 14, fontSize: 12, opacity: 0.8 }}>
          ● Live • Last updated {lastUpdated}
        </p>
      </header>

      {/* DASHBOARD SECTION */}
      <section
        style={{
          maxWidth: 1200,
          margin: '40px auto',
          padding: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 30,
        }}
      >
        {/* LEFT – TOP LISTS */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: 12 }}>
            🚨 Worst AQI (Top 5)
          </h3>

          {topWorst.map((city) => (
            <div
              key={city.name}
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 14,
                padding: '12px 16px',
                marginBottom: 10,
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{city.name}</span>
              <strong>{city.aqi}</strong>
            </div>
          ))}

          <h3 style={{ color: '#fff', margin: '26px 0 12px' }}>
            🌿 Best AQI (Top 5)
          </h3>

          {topBest.map((city) => (
            <div
              key={city.name}
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 14,
                padding: '12px 16px',
                marginBottom: 10,
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{city.name}</span>
              <strong>{city.aqi}</strong>
            </div>
          ))}
        </div>

        {/* RIGHT – MAP */}
        <div
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            height: 520,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          {typeof window !== 'undefined' && (
            <AqiMap cityData={cityData} />
          )}
        </div>
      </section>

      {/* CITY GRID */}
      <section style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
        <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 32 }}>
          City AQI Overview
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginTop: 30,
          }}
        >
          {cityData.map((city) => (
            <div
              key={city.name}
              style={{
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              }}
            >
              <div
                style={{
                  background: getAqiColor(city.aqi),
                  color: '#fff',
                  textAlign: 'center',
                  padding: 30,
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800 }}>
                  {city.aqi ?? '--'}
                </div>
                <div>{city.level}</div>
              </div>

              <div style={{ padding: 20, textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>
                  {city.name}
                </div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                  {city.dominant} dominant
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: 'center',
          color: '#e5e7eb',
          fontSize: 12,
          padding: '30px 10px',
        }}
      >
        © 2025 AQIIndia.live • Data powered by WAQI.info
      </footer>
    </>
  );
}

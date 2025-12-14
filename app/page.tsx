'use client';

import { useEffect, useState } from 'react';
import AqiMap, { CityData } from './components/AqiMap';

const CITIES: Omit<CityData, 'aqi' | 'dominant' | 'level'>[] = [
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

function getAqiGradient(aqi: number | null) {
  if (!aqi) return 'from-gray-400 to-gray-500';
  if (aqi <= 50) return 'from-green-400 to-green-600';
  if (aqi <= 100) return 'from-yellow-400 to-yellow-600';
  if (aqi <= 150) return 'from-orange-400 to-orange-600';
  if (aqi <= 200) return 'from-red-400 to-red-600';
  if (aqi <= 300) return 'from-purple-500 to-purple-700';
  return 'from-gray-700 to-gray-900';
}

export default function Home() {
  const [cityData, setCityData] = useState<CityData[]>(
    CITIES.map((c) => ({
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
      const results = await Promise.all(
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

      setCityData(results);
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

  return (
    <>
      <header className="text-center py-24 px-6 text-white">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Live AQI India
        </h1>
        <p className="mt-4 text-xl text-slate-200">
          Real-time Air Quality Dashboard
        </p>

        <div className="mt-10 inline-flex flex-col items-center bg-white/90 rounded-3xl px-12 py-10 shadow-2xl">
          <span className="text-7xl font-bold text-indigo-600">
            {nationalAverage}
          </span>
          <span className="mt-2 text-xl font-semibold text-indigo-600">
            {typeof nationalAverage === 'number'
              ? getAqiLevel(nationalAverage)
              : 'Loading'}
          </span>
          <span className="text-sm text-gray-500">
            National Average AQI
          </span>
        </div>

        <p className="mt-6 text-sm text-slate-300 animate-pulse">
          ● Live • Last updated {lastUpdated}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <AqiMap cityData={cityData} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          City AQI Overview
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cityData.map((city) => (
            <div
              key={city.name}
              className="rounded-3xl bg-white/20 backdrop-blur-lg shadow-xl
                         hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`h-36 flex flex-col items-center justify-center
                text-white font-bold bg-gradient-to-br ${getAqiGradient(
                  city.aqi
                )}`}
              >
                <span className="text-5xl">{city.aqi ?? '--'}</span>
                <span className="text-lg mt-1">{city.level}</span>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {city.name}
                </h3>
                <p className="text-slate-200 text-sm">
                  {city.dominant} dominant
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-slate-300 py-10 text-sm">
        © 2025 AQIIndia.live • Data powered by WAQI.info
      </footer>
    </>
  );
}

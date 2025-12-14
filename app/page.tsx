'use client';

import { useEffect, useState } from 'react';
import AqiMap from './components/AqiMap';

const CITIES = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Bengaluru', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Lucknow', slug: 'lucknow' },
];

const TOKEN = process.env.NEXT_PUBLIC_WAQI_TOKEN;

interface CityData {
  name: string;
  slug: string;
  aqi: number | null;
  dominant: string;
  level: string;
}

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

  const [lastUpdated, setLastUpdated] = useState<string>('—');

  useEffect(() => {
    if (!TOKEN) return;

    const fetchData = async () => {
      const results = await Promise.all(
        CITIES.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`
            );
            const json = await res.json();

            if (json.status !== 'ok') throw new Error('Bad data');

            const aqi = json.data.aqi ?? null;

            return {
              ...city,
              aqi,
              dominant: json.data.dominentpol || 'PM2.5',
              level: getAqiLevel(aqi),
            };
          } catch {
            return {
              ...city,
              aqi: null,
              dominant: 'PM2.5',
              level: 'Unavailable',
            };
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

  const validAqi = cityData.filter((c) => c.aqi !== null);
  const nationalAverage =
    validAqi.length > 0
      ? Math.round(
          validAqi.reduce((sum, c) => sum + (c.aqi || 0), 0) /
            validAqi.length
        )
      : '--';

  return (
    <>
      {/* HERO */}
      <header className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          L

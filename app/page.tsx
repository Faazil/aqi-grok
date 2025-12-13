'use client';

import { useState, useEffect } from 'react';
import AqiMap from './components/AqiMap';

const CITIES = [
  { name: 'Delhi', slug: 'delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', slug: 'jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', slug: 'lucknow', lat: 26.8467, lng: 80.9462 },
];

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // ← REPLACE THIS!

interface CityData {
  name: string;
  aqi: number | null;
  dominant: string;
  level: string;
  lat: number;
  lng: number;
}

function getAqiColor(aqi: number | null): string {
  if (!aqi) return 'bg-gray-400';
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-gray-900';
}

function getAqiLevel(aqi: number | null): string {
  if (!aqi) return 'Loading...';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export default function Home() {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      if (!TOKEN || TOKEN === 'ccf9886c6c972e354ecebca2730511ec2e928183') {
        setError('WAQI token missing!');
        setLoading(false);
        return;
      }

      try {
        const promises = CITIES.map(async (city) => {
          const res = await fetch(`https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`);
          const json = await res.json();
          if (json.status !== 'ok') return { ...city, aqi: null, dominant: 'N/A', level: 'Error' };
          const data = json.data;
          return {
            name: city.name,
            aqi: data.aqi || null,
            dominant: data.dominentpol || 'PM2.5',
            level: getAqiLevel(data.aqi),
            lat: city.lat,
            lng: city.lng,
          };
        });

        const results = await Promise.all(promises);
        setCityData(results);
      } catch (e) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  const validCities = cityData.filter((c) => c.aqi !== null);
  const nationalAverage = validCities.length > 0
    ? Math.round(validCities.reduce((sum, c) => sum + c.aqi!, 0) / validCities.length)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-100">
      {/* Hero */}
      <header className="py-16 text-center bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Live AQI India</h1>
        <p className="text-2xl mb-8">Real-Time Air Quality Dashboard</p>
        {nationalAverage !== null && (
          <div className="inline-block bg-white/20 backdrop-blur-lg rounded-3xl p-10">
            <p className="text-8xl font-black">{nationalAverage}</p>
            <p className="text-3xl">{getAqiLevel(nationalAverage)}</p>
            <p className="text-xl mt-4">National Average AQI</p>
          </div>
        )}
      </header>

      {/* Map */}
      <section className="mx-4 my-12 h-96 rounded-3xl overflow-hidden shadow-2xl">
        <AqiMap cityData={cityData} />
      </section>

      {/* City Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Major Cities Live AQI</h2>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cityData.map((city) => (
            <div key={city.name} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition">
              <div className={`text-5xl font-bold mb-2 ${getAqiColor(city.aqi)} text-white py-4 rounded-t-2xl`}>
                {city.aqi || '--'}
              </div>
              <p className="text-xl font-semibold mb-2">{city.level}</p>
              <p className="text-2xl font-bold text-gray-800">{city.name}</p>
              <p className="text-gray-600 mt-2">{city.dominant} dominant</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

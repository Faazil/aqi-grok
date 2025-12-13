'use client';

import { useState, useEffect } from 'react';

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

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // Replace!

interface CityData {
  name: string;
  aqi: number | null;
  dominant: string;
  level: string;
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

  useEffect(() => {
    const fetchData = async () => {
      if (!TOKEN || TOKEN === 'ccf9886c6c972e354ecebca2730511ec2e928183') {
        setLoading(false);
        return;
      }

      try {
        const promises = CITIES.map(async (city) => {
          const res = await fetch(`https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`);
          const json = await res.json();
          if (json.status !== 'ok') return { name: city.name, aqi: null, dominant: 'N/A', level: 'Error' };
          const data = json.data;
          return {
            name: city.name,
            aqi: data.aqi || null,
            dominant: data.dominentpol || 'PM2.5',
            level: getAqiLevel(data.aqi),
          };
        });

        const results = await Promise.all(promises);
        setCityData(results);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const valid = cityData.filter(c => c.aqi !== null);
  const nationalAvg = valid.length > 0 ? Math.round(valid.reduce((s, c) => s + c.aqi!, 0) / valid.length) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50">
      {/* Hero */}
      <header className="py-20 text-center bg-gradient-to-b from-indigo-700 to-purple-800 text-white">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Live AQI India</h1>
        <p className="text-3xl mb-10">Real-Time Air Quality Dashboard</p>
        {nationalAvg && (
          <div className="inline-block bg-white/20 backdrop-blur rounded-3xl p-12">
            <p className="text-9xl font-black">{nationalAvg}</p>
            <p className="text-4xl">{getAqiLevel(nationalAvg)}</p>
            <p className="text-2xl mt-4">National Average</p>
          </div>
        )}
      </header>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Major Cities Live AQI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {cityData.map((city) => (
            <div key={city.name} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition">
              <div className={`${getAqiColor(city.aqi)} h-48 flex flex-col items-center justify-center text-white`}>
                <p className="text-8xl font-bold">{city.aqi || '--'}</p>
                <p className="text-2xl mt-2">{city.level}</p>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800">{city.name}</h3>
                <p className="text-lg text-gray-600 mt-2">{city.dominant} dominant</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import useSWR from 'swr';
import { useState } from 'react';

const cities = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Pune', slug: 'pune' },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

function getAqiColor(aqi: number | undefined) {
  if (!aqi) return 'bg-gray-400';
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-maroon-800';
}

function getAqiLabel(aqi: number | undefined) {
  if (!aqi) return 'Loading...';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export default function Home() {
  const [token] = useState('YOUR_TOKEN_HERE'); // Paste your WAQI token here!

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Live AQI India</h1>
          <p className="text-xl md:text-2xl opacity-90">Real-time Air Quality Monitoring</p>
          <p className="mt-4 text-lg">Data powered by WAQI.info</p>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <input
          type="text"
          placeholder="Search city or location..."
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Current Air Quality - Major Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cities.map((city) => {
            const { data, error } = useSWR(
              token !== 'ccf9886c6c972e354ecebca2730511ec2e928183' ? `https://api.waqi.info/feed/${city.slug}/?token=${token}` : null,
              fetcher
            );

            const aqi = data?.data?.aqi;
            const dominant = data?.data?.dominentpol || 'PM2.5';

            return (
              <div key={city.name} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <div className={`h-32 ${getAqiColor(aqi)} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <p className="text-6xl font-bold">{aqi || '--'}</p>
                    <p className="text-xl">{getAqiLabel(aqi)}</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{city.name}</h3>
                  <p className="text-gray-600 mt-2">{dominant} dominant</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

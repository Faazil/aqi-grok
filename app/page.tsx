'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cities, setCities] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/india')
      .then(r => r.json())
      .then(d => setCities(d.cities || []));

    const id = setInterval(() => location.reload(), 1800000);
    return () => clearInterval(id);
  }, []);

  const filtered = cities.filter(c => c.city.toLowerCase().includes(search.toLowerCase()));

  const color = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-700';
    return 'bg-black';
  };

  const label = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl md:text-7xl font-black text-center my-8 text-gray-800">Live AQI India</h1>
        <input
          type="text"
          placeholder="Search city..."
          className="w-full max-w-2xl mx-auto block p-5 rounded-2xl text-xl shadow-xl mb-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(c => (
            <div key={c.uid} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
              <div className={`${color(c.aqi)} h-48 flex items-center justify-center`}>
                <div className="text-7xl font-black text-white drop-shadow-2xl">{c.aqi}</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">{c.city}</h3>
                <p className="text-lg font-semibold text-gray-700 mt-2">{label(c.aqi)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-16 text-gray-600">Data: WAQI.info</p>
      </div>
    </div>
  );
}

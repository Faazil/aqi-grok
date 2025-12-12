'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cities, setCities] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/india')
      .then(r => r.json())
      .then(d => {
        setCities(d.cities || []);
        setLoading(false);
      });

    const interval = setInterval(() => location.reload(), 1800000); // 30 min
    return () => clearInterval(interval);
  }, []);

  const filtered = cities.filter((c: any) =>
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const getColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-black';
  };

  const getText = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl">Loading live AQI data...</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-3">
            Live AQI India
          </h1>
          <p className="text-center text-xl text-gray-600 mb-10">
            Real-time Air Quality Index for 250+ cities • Updated every 30 mins
          </p>

          <input
            type="text"
            placeholder="🔍 Search city: Delhi, Mumbai, Bangalore, Kolkata..."
            className="w-full max-w-2xl mx-auto block p-5 text-lg border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-blue-500 mb-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((city) => (
              <div key={city.uid} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800">{city.city}</h3>
                  <span className={`text-2xl font-bold text-white px-4 py-2 rounded-xl ${getColor(city.aqi)}`}>
                    {city.aqi}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{getText(city.aqi)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-500">
            Data powered by <a href="https://waqi.info" className="underline font-semibold">WAQI.info</a>
          </div>
        </div>
      </div>
    </>
  );
}

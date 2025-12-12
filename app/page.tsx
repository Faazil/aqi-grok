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

    const interval = setInterval(() => location.reload(), 1800000);
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
    if (aqi <= 300) return 'bg-purple-700';
    return 'bg-black';
  };

  const getLabel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <=150) return 'Unhealthy for Sensitive';
    if (aqi <=200) return 'Unhealthy';
    if (aqi <=300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-3xl font-bold">Loading live AQI...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-4">Live AQI India</h1>
        <p className="text-xl text-center text-gray-600 mb-10">Real-time air quality • 250+ cities • Updated every 30 min</p>

        <input
          type="text"
          placeholder="Search city: Delhi, Mumbai, Noida..."
          className="w-full max-w-2xl mx-auto block px-6 py-5 rounded-2xl shadow-lg text-lg mb-12 focus:outline-none focus:ring-4 focus:ring-purple-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(city => (
            <div key={city.uid} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <div className={`h-40 flex items-center justify-center ${getColor(city.aqi)}`}>
                <div className="text-white text-6xl font-black drop-shadow-lg">{city.aqi}</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{city.city}</h3>
                <p className="text-lg font-semibold text-gray-700">{getLabel(city.aqi)}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-16 text-gray-500">
          Data powered by <a href="https://waqi.info" className="font-bold underline">WAQI.info</a>
        </p>
      </div>
    </div>
  );
}

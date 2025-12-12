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

    // Auto refresh every 30 minutes
    const interval = setInterval(() => window.location.reload(), 30*60*1000);
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
    return 'bg-maroon-700';
  };

  if (loading) return <div className="p-10 text-center text-2xl">Loading live AQI data for India...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-2">Live AQI India</h1>
        <p className="text-center text-gray-600 mb-8">Real-time Air Quality Index across 250+ Indian cities</p>

        <input
          type="text"
          placeholder="Search city (Delhi, Mumbai, Bangalore...)"
          className="w-full max-w-xl mx-auto block p-4 mb-8 border rounded-lg text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((city: any) => (
            <div key={city.uid} className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{city.city}</h3>
                <span className={`text-white px-3 py-1 rounded-full text-white font-bold ${getColor(city.aqi)}`}>
                  {city.aqi}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {city.aqi <= 50 && 'Good'}
                {city.aqi > 50 && city.aqi <= 100 && 'Moderate'}
                {city.aqi > 100 && city.aqi <= 150 && 'Unhealthy for Sensitive'}
                {city.aqi > 150 && city.aqi <= 200 && 'Unhealthy'}
                {city.aqi > 200 && city.aqi <= 300 && 'Very Unhealthy'}
                {city.aqi > 300 && 'Hazardous'}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Data powered by <a href="https://waqi.info" className="underline">WAQI.info</a> • Updated every 30 mins
        </p>
      </div>
    </div>
  );
}

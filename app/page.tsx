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
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-3xl font-bold text-gray-700">Loading live AQI data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-3">
            Live AQI India
          </h1>
          <p className="text-xl text-gray-600">
            Real-time air quality for 250+ cities • Updated every 30 min
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search city: Delhi, Mumbai, Noida, Bangalore..."
            className="w-full px-6 py-5 text-lg rounded-2xl shadow-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-2xl text-gray-500">
              No city found — try “Delhi” or “Mumbai”
            </div>
          ) : (
            filtered.map((city) => (
              <div
                key={city.uid}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className={`h-32 ${getColor(city.aqi)} flex items-center justify-center`}>
                  <div className="text-white text-5xl font-black">{city.aqi}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 truncate">{city.city}</h3>
                  <p className="text-gray-600 mt-1 font-medium">{getLabel(city.aqi)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          Data powered by{' '}
          <a href="https://waqi.info" className="font-bold underline">
            WAQI.info
          </a>
        </div>
      </div>
    </div>
  );
}

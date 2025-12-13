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

  const validCities = cityData.filter(c => c.aqi !== null);
  const nationalAverage = validCities.length > 0 ? Math.round(validCities.reduce((sum, c) => sum + c.aqi!, 0) / validCities.length) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100">
      {/* Hero */}
      <header className="relative py-24 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://cdn.dribbble.com/userupload/44266015/file/0dafdd4dceb07d755d1dcee2c331c179.png?resize=2048x1480&vertical=center')" }}></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-indigo-900 mb-6">Live AQI India</h1>
          <p className="text-3xl text-indigo-800 mb-10">Real-Time Air Quality Dashboard</p>
          {nationalAverage && (
            <div className="inline-block bg-white/90 backdrop-blur rounded-3xl p-12 shadow-2xl">
              <p className="text-9xl font-black text-indigo-900">{nationalAverage}</p>
              <p className="text-4xl text-indigo-700 mt-4">{getAqiLevel(nationalAverage)}</p>
              <p className="text-2xl text-indigo-600 mt-2">National Average</p>
            </div>
          )}
        </div>
      </header>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Major Cities Live AQI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {cityData.map((city) => (
            <div key={city.name} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-4 transition-all duration-500">
              <div className={`${getAqiColor(city.aqi)} h-56 flex flex-col items-center justify-center text-white`}>
                <p className="text-8xl font-extrabold">{city.aqi || '--'}</p>
                <p className="text-2xl mt-4">{city.level}</p>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">{city.name}</h3>
                <p className="text-xl text-gray-600">{city.dominant} dominant</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/90 rounded-3xl shadow-2xl mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Health Tips for Current Conditions</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-10 bg-gradient-to-br from-green-50 to-blue-100 rounded-3xl text-center shadow-lg">
            <span className="text-7xl block mb-6">😷</span>
            <h3 className="text-2xl font-bold mb-4">Wear N95 Masks</h3>
            <p className="text-gray-700">Critical in Hazardous cities like Delhi</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl text-center shadow-lg">
            <span className="text-7xl block mb-6">🏠</span>
            <h3 className="text-2xl font-bold mb-4">Stay Indoors</h3>
            <p className="text-gray-700">Avoid exertion in Unhealthy areas</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl text-center shadow-lg">
            <span className="text-7xl block mb-6">🌬️</span>
            <h3 className="text-2xl font-bold mb-4">Use Air Purifiers</h3>
            <p className="text-gray-700">Keep windows closed</p>
          </div>
        </div>
      </section>
    </div>
  );
}

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

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // Replace with your actual WAQI token

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
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
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
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const validCities = cityData.filter((c) => c.aqi !== null);
  const nationalAverage = validCities.length > 0 ? Math.round(validCities.reduce((sum, c) => sum + c.aqi!, 0) / validCities.length) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
      {/* Hero Section with Beautiful Background */}
      <header className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('https://i.redd.it/hr2a4dm99q791.jpg')" }} // Clear blue sky over Mumbai skyline
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-50/80"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-8xl font-extrabold text-indigo-900 mb-6 drop-shadow-2xl">Live AQI India</h1>
          <p className="text-2xl md:text-4xl text-indigo-800 mb-8">Real-Time Air Quality Dashboard for Major Cities</p>
          <p className="text-xl text-indigo-700 mb-12">Powered by WAQI.info • Updated December 14, 2025</p>
          {nationalAverage && (
            <div className="inline-block bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
              <p className="text-7xl md:text-9xl font-black text-indigo-900">{nationalAverage}</p>
              <p className="text-2xl md:text-4xl text-indigo-700 mt-4">{getAqiLevel(nationalAverage)}</p>
              <p className="text-lg md:text-xl text-indigo-600 mt-2">National Average AQI</p>
            </div>
          )}
        </div>
      </header>

      {/* City Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 -mt-20 relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Major Cities Live AQI</h2>
        {loading && <p className="text-center text-gray-600 text-xl">Fetching latest data...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {cityData.map((city) => (
            <div key={city.name} className="group bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-4 transition-all duration-500">
              <div className={`${getAqiColor(city.aqi)} h-48 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <p className="text-7xl md:text-8xl font-extrabold drop-shadow-2xl relative z-10">{city.aqi || '--'}</p>
                <p className="text-xl md:text-2xl font-bold mt-4 drop-shadow-lg relative z-10">{city.level}</p>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{city.name}</h3>
                <p className="text-lg text-gray-600">{city.dominant} dominant pollutant</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Health Tips for Current AQI Levels</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">😷</span>
            <h3 className="text-2xl font-bold mb-3">Wear N95 Masks Outdoors</h3>
            <p className="text-gray-700">Especially in Hazardous cities like Delhi</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">🏠</span>
            <h3 className="text-2xl font-bold mb-3">Limit Outdoor Activities</h3>
            <p className="text-gray-700">Sensitive groups should stay indoors</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">🌬️</span>
            <h3 className="text-2xl font-bold mb-3">Use Air Purifiers</h3>
            <p className="text-gray-700">Keep windows closed in Unhealthy areas</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-10 text-center">
        <p className="text-lg">&copy; 2025 Live AQI India • Breathe Better, Live Healthier</p>
        <p className="text-sm mt-2 opacity-80">Data sourced from WAQI.info</p>
      </footer>
    </div>
  );
}

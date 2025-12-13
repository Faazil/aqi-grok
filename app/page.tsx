'use client';

import { useState, useEffect } from 'react';

const CITIES = [
  { name: 'Delhi', slug: 'delhi', state: 'Delhi' },
  { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra' },
  { name: 'Bengaluru', slug: 'bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana' },
  { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal' },
  { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat' },
  { name: 'Pune', slug: 'pune', state: 'Maharashtra' },
  { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan' },
  { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh' },
  { name: 'Kanpur', slug: 'kanpur', state: 'Uttar Pradesh' },
  { name: 'Agra', slug: 'agra', state: 'Uttar Pradesh' },
  { name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh' },
  { name: 'Patna', slug: 'patna', state: 'Bihar' },
  { name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh' },
  { name: 'Indore', slug: 'indore', state: 'Madhya Pradesh' },
];

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // Replace with your WAQI token! (Or use process.env.WAQI_TOKEN)

interface CityData {
  name: string;
  state: string;
  aqi: number | null;
  dominant: string;
  level: string;
}

function getAqiColor(aqi: number | null) {
  if (!aqi) return 'bg-gray-400';
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-gray-900';
}

function getAqiLevel(aqi: number | null) {
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
    const fetchAQI = async () => {
      if (!TOKEN || TOKEN === 'ccf9886c6c972e354ecebca2730511ec2e928183') {
        setError('Please add your WAQI token!');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const promises = CITIES.map(async (city) => {
          const res = await fetch(`https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`);
          if (!res.ok) throw new Error(`Failed for ${city.name}`);
          const data = await res.json();
          const aqi = data.data.aqi;
          const dominant = data.data.dominentpol || 'PM2.5';
          return { name: city.name, state: city.state, aqi, dominant, level: getAqiLevel(aqi) };
        });

        const results = await Promise.all(promises);
        setCityData(results);
      } catch (err) {
        setError('Failed to fetch AQI data. Check token/network.');
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();

    // Auto-refresh every 5 mins
    const interval = setInterval(fetchAQI, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Top 5 Polluted for Chart (sorted by AQI desc, non-null)
  const topPolluted = cityData
    .filter((c) => c.aqi !== null)
    .sort((a, b) => (b.aqi! > a.aqi! ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50">
      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }} // Clean blue sky over Indian skyline
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extrabold text-indigo-900 mb-6 drop-shadow-2xl">Live AQI India</h1>
          <p className="text-2xl md:text-4xl text-indigo-800 mb-8">Real-Time Dashboard for All States</p>
          <p className="text-xl text-indigo-700 mb-12">Powered by WAQI.info • Auto-Updates Every 5 Mins</p>
          <input
            type="text"
            placeholder="Search city..."
            className="w-full max-w-2xl px-8 py-5 text-xl bg-white/90 backdrop-blur-md rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400"
          />
        </div>
      </header>

      {/* Top Polluted Chart */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Top 5 Most Polluted Cities Right Now</h2>
        {topPolluted.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <canvas id="aqiChart" width="400" height="200"></canvas>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
              {`
                const ctx = document.getElementById('aqiChart').getContext('2d');
                new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: [${topPolluted.map(c => `'${c.name}'`).join(',')}],
                    datasets: [{
                      label: 'AQI',
                      data: [${topPolluted.map(c => c.aqi).join(',')}],
                      backgroundColor: [${topPolluted.map(c => `'${getAqiColor(c.aqi)}'`).join(',')}],
                    }]
                  },
                  options: { scales: { y: { beginAtZero: true } } }
                });
              `}
            </script>
          </div>
        )}
      </section>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 -mt-8 relative z-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Live AQI by Major Cities & States</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <div className="text-center">Loading live data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cityData.map((city) => (
              <div key={city.name} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`${getAqiColor(city.aqi)} h-48 flex flex-col items-center justify-center text-white p-4`}>
                  <p className="text-6xl font-bold">{city.aqi || '--'}</p>
                  <p className="text-xl mt-2">{city.level}</p>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800">{city.name}</h3>
                  <p className="text-sm text-gray-500">{city.state}</p>
                  <p className="text-gray-600 mt-2">{city.dominant} Dominant</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Health Tips */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/80 rounded-3xl shadow-2xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Today's Health Tips</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
            <span className="text-5xl">😷</span>
            <h3 className="text-xl font-semibold mt-2">Wear N95 Mask</h3>
            <p className="text-gray-600">For Hazardous levels (e.g., Delhi)</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
            <span className="text-5xl">🏠</span>
            <h3 className="text-xl font-semibold mt-2">Stay Indoors</h3>
            <p className="text-gray-600">Avoid peak pollution hours</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <span className="text-5xl">🌿</span>
            <h3 className="text-xl font-semibold mt-2">Air Purifiers On</h3>
            <p className="text-gray-600">For Unhealthy cities like Mumbai</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-8 text-center">
        <p>&copy; 2025 Live AQI India • Real-Time Data from WAQI</p>
      </footer>
    </div>
  );
}

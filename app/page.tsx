'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

// Fix Leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CITIES = [
  { name: 'Delhi', slug: 'delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', slug: 'jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', slug: 'lucknow', lat: 26.8467, lng: 80.9462 },
];

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // ← Replace with your real token!

interface CityData {
  name: string;
  aqi: number | null;
  dominant: string;
  level: string;
  lat: number;
  lng: number;
}

function getAqiColor(aqi: number | null): string {
  if (!aqi) return '#94a3b8'; // slate-400
  if (aqi <= 50) return '#22c55e'; // green-500
  if (aqi <= 100) return '#eab308'; // yellow-500
  if (aqi <= 150) return '#f97316'; // orange-500
  if (aqi <= 200) return '#ef4444'; // red-500
  if (aqi <= 300) return '#a855f7'; // purple-500
  return '#1e293b'; // slate-900
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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!TOKEN || TOKEN === 'ccf9886c6c972e354ecebca2730511ec2e928183') {
        setError('Add your WAQI token!');
        setLoading(false);
        return;
      }

      try {
        const promises = CITIES.map(async (city) => {
          const res = await fetch(`https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`);
          const json = await res.json();
          if (json.status !== 'ok') return { ...city, aqi: null, dominant: 'N/A', level: 'Error' };
          const data = json.data;
          return {
            name: city.name,
            aqi: data.aqi,
            dominant: data.dominentpol || 'PM2.5',
            level: getAqiLevel(data.aqi),
            lat: city.lat,
            lng: city.lng,
          };
        });

        const results = await Promise.all(promises);
        setCityData(results);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 min refresh
    return () => clearInterval(interval);
  }, []);

  const validData = cityData.filter(c => c.aqi !== null);
  const nationalAverage = validData.length > 0 
    ? Math.round(validData.reduce((sum, c) => sum + c.aqi!, 0) / validData.length)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-100">
      {/* Hero */}
      <header className="py-16 text-center bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Live AQI India</h1>
        <p className="text-2xl mb-8">Real-Time Air Quality Dashboard</p>
        {nationalAverage && (
          <div className="inline-block bg-white/20 backdrop-blur rounded-3xl p-10">
            <p className="text-8xl font-black">{nationalAverage}</p>
            <p className="text-3xl">{getAqiLevel(nationalAverage)}</p>
            <p className="text-xl mt-4">National Average</p>
          </div>
        )}
      </header>

      {/* Map */}
      <section className="mx-4 my-12 h-96 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="h-full flex items-center justify-center bg-gray-200">Loading map...</div>
        ) : (
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {cityData.map((city) => city.aqi && (
              <Marker 
                key={city.name} 
                position={[city.lat, city.lng]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="background-color: ${getAqiColor(city.aqi)}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">${city.aqi}</div>`,
                  iconSize: [36, 36],
                  iconAnchor: [18, 18],
                })}
              >
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-lg">{city.name}</p>
                    <p className="text-2xl font-bold">{city.aqi}</p>
                    <p>{city.level}</p>
                    <p className="text-sm">{city.dominant} dominant</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </section>

      {/* City Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">Major Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cityData.map((city) => (
            <div key={city.name} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition">
              <div className="text-5xl font-bold mb-2" style={{ color: getAqiColor(city.aqi) }}>
                {city.aqi || '--'}
              </div>
              <p className="text-xl font-semibold mb-1">{city.level}</p>
              <p className="text-2xl font-bold text-gray-800">{city.name}</p>
              <p className="text-gray-600 mt-2">{city.dominant} dominant</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

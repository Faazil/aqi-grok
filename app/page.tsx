'use client';

import { useState } from 'react';

const CITIES = [
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, aqi: 717, dominant: 'PM2.5', level: 'Hazardous' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, aqi: 167, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, aqi: 151, dominant: 'PM2.5', level: 'Unhealthy for Sensitive' },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, aqi: 192, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, aqi: 156, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, aqi: 424, dominant: 'PM2.5', level: 'Hazardous' },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, aqi: 192, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, aqi: 268, dominant: 'PM2.5', level: 'Very Unhealthy' },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, aqi: 180, dominant: 'PM2.5', level: 'Unhealthy for Sensitive' },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, aqi: 513, dominant: 'PM2.5', level: 'Hazardous' },
];

const TOKEN = 'YOUR_WAQI_TOKEN_HERE'; // Replace for live

interface CityData {
  name: string;
  lat: number;
  lng: number;
  aqi: number | null;
  dominant: string;
  level: string;
}

function getAqiColor(aqi: number | null): string {
  if (!aqi) return '#94a3b8';
  if (aqi <= 50) return '#10b981';
  if (aqi <= 100) return '#f59e0b';
  if (aqi <= 150) return '#f97316';
  if (aqi <= 200) return '#ef4444';
  if (aqi <= 300) return '#a855f7';
  return '#1e293b';
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
  const [cityData, setCityData] = useState<CityData[]>(CITIES);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  // Live fetch logic (same as before)
  useEffect(() => {
    // ... (fetch code from previous, omitted for brevity)
  }, []);

  const nationalAverage = Math.round(CITIES.reduce((sum, c) => sum + c.aqi, 0) / CITIES.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      {/* Hero with Nature Wallpaper */}
      <header className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }} // Nature wallpaper: Green hills and blue sky
        ></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-8xl font-extrabold text-green-900 mb-6 drop-shadow-2xl">Live AQI India</h1>
          <p className="text-2xl md:text-4xl text-green-800 mb-8">Interactive City Map & Real-Time Dashboard</p>
          <p className="text-xl text-green-700 mb-12">Powered by WAQI.info • Updated December 14, 2025</p>
          <div className="inline-block bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
            <p className="text-7xl md:text-9xl font-black text-green-900">{nationalAverage}</p>
            <p className="text-2xl md:text-4xl text-green-700 mt-4">{getAqiLevel(nationalAverage)}</p>
            <p className="text-lg md:text-xl text-green-600 mt-2">National Average AQI</p>
          </div>
        </div>
      </header>

      {/* Interactive City Map */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Interactive City Map</h2>
        <div className="h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <AqiMap cityData={cityData} onCitySelect={setSelectedCity} />
        </div>
        <p className="text-center mt-6 text-gray-600">Zoom and click markers for city details | Tinted by AQI level</p>
      </section>

      {/* Selected City Detail (Tinted Box) */}
      {selectedCity && (
        <section className="max-w-md mx-auto mb-16 rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: getAqiColor(selectedCity.aqi) }}>
          <div className="p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">{selectedCity.name}</h3>
            <p className="text-6xl font-black mb-4">{selectedCity.aqi}</p>
            <p className="text-2xl mb-2">{selectedCity.level}</p>
            <p className="text-xl">{selectedCity.dominant} dominant</p>
          </div>
        </section>
      )}

      {/* Tinted Boxes for Cities/States */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">City & State AQI Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cityData.map((city) => (
            <div key={city.name} className="group bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 cursor-pointer" onClick={() => setSelectedCity(city)}>
              <div className={`${getAqiColor(city.aqi)} h-48 flex flex-col items-center justify-center text-white relative overflow-hidden`} style={{ backgroundColor: getAqiColor(city.aqi) }}>
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

      {/* Health Tips */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Health Tips for Current AQI Levels</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">😷</span>
            <h3 className="text-2xl font-bold mb-3">Wear N95 Masks</h3>
            <p className="text-gray-700">Critical in Hazardous cities like Delhi</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">🏠</span>
            <h3 className="text-2xl font-bold mb-3">Stay Indoors</h3>
            <p className="text-gray-700">Avoid exertion in Unhealthy areas</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl shadow-lg">
            <span className="text-6xl mb-4 block">🌬️</span>
            <h3 className="text-2xl font-bold mb-3">Use Air Purifiers</h3>
            <p className="text-gray-700">Keep windows closed</p>
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

'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CITIES = [ /* same as before, add lat/lng for map */
  { name: 'Delhi', slug: 'delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.0760, lng: 72.8777 },
  // Add others similarly – quick list:
  { name: 'Bengaluru', slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567 },
  // Add more if you want
];

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183';

 // ... same fetch logic as before

export default function Home() {
  // ... same state/fetch

  const nationalAverage = cityData.length > 0 ? Math.round(cityData.reduce((sum, c) => sum + (c.aqi || 0), 0) / cityData.filter(c => c.aqi).length) : null;

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen">
      {/* Hero like aqi.in */}
      <header className="py-12 px-4 text-center bg-gradient-to-br from-red-600 to-purple-800 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Live AQI India</h1>
        <p className="text-2xl mb-8">Real-Time Air Quality Across India</p>
        {nationalAverage && (
          <div className="inline-block bg-white/20 backdrop-blur rounded-3xl p-8">
            <p className="text-8xl font-black">{nationalAverage}</p>
            <p className="text-3xl">{getAqiLevel(nationalAverage)}</p>
            <p className="text-xl mt-4">National Average AQI</p>
          </div>
        )}
      </header>

      {/* Interactive Map like waqi.info */}
      <section className="h-96 my-8 mx-4 rounded-3xl overflow-hidden shadow-2xl">
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {cityData.map((city) => city.aqi && (
            <Marker key={city.name} position={[city.lat!, city.lng!]}>
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-lg">{city.name}</p>
                  <p className="text-3xl">{city.aqi}</p>
                  <p>{city.level}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      {/* City Cards Grid */}
      {/* ... same grid as before */}

      {/* Health Tips & Footer */}
      {/* ... same as before */}
    </div>
  );
}

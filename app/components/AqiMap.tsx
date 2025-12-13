'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import react-leaflet components (no SSR)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import 'leaflet-defaulticon-compatibility';

interface CityData {
  name: string;
  aqi: number | null;
  level: string;
  lat: number;
  lng: number;
}

interface AqiMapProps {
  cityData: CityData[];
}

export default function AqiMap({ cityData }: AqiMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure it's client-side
  if (typeof window === 'undefined') return null;

  if (!isMounted) {
    setIsMounted(true);
    return <div className="h-96 bg-gray-200 flex items-center justify-center rounded-3xl">Loading map...</div>;
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full rounded-3xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cityData.map((city) => city.aqi !== null && (
        <Marker key={city.name} position={[city.lat, city.lng]}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-bold text-lg">{city.name}</p>
              <p className="text-2xl font-bold">{city.aqi}</p>
              <p>{city.level}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

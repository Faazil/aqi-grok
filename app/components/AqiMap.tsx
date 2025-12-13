'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import react-leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface AqiMapProps {
  cityData: Array<{ name: string; aqi: number | null; lat: number; lng: number; level: string }>;
}

export default function AqiMap({ cityData }: AqiMapProps) {
  useEffect(() => {
    // Fix any remaining icon issues
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  if (cityData.length === 0) return <div className="h-96 bg-gray-200 flex items-center justify-center rounded-3xl">Loading map...</div>;

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }} className="rounded-3xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cityData.map((city) => city.aqi && (
        <Marker key={city.name} position={[city.lat, city.lng]}>
          <Popup>
            <div className="text-center">
              <p className="font-bold">{city.name}</p>
              <p className="text-2xl font-bold">{city.aqi}</p>
              <p>{city.level}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

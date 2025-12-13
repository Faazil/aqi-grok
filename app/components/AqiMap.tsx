'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

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

function getAqiColor(aqi: number) {
  if (aqi <= 50) return '#10b981';
  if (aqi <= 100) return '#f59e0b';
  if (aqi <= 150) return '#f97316';
  if (aqi <= 200) return '#ef4444';
  if (aqi <= 300) return '#a855f7';
  return '#1e293b';
}

export default function AqiMap({ cityData }: AqiMapProps) {
  useEffect(() => {
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

  if (typeof window === 'undefined') return null;

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cityData.map((city) => city.aqi && (
        <Marker 
          key={city.name} 
          position={[city.lat, city.lng]}
          icon={L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${getAqiColor(city.aqi)}; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${city.aqi}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">{city.name}</h3>
              <p className="text-2xl font-bold mb-1">{city.aqi}</p>
              <p className="mb-1">{city.level}</p>
              <p className="text-sm text-gray-600">PM2.5 dominant</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

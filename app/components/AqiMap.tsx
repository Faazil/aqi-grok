'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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
  useEffect(() => {
    // Fix icons if needed
  }, []);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cityData.map((city) => city.aqi && (
        <Marker 
          key={city.name} 
          position={[city.lat, city.lng]}
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

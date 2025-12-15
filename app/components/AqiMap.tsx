'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

export interface CityData {
  name: string;
  aqi: number;
  level: string;
  lat: number;
  lng: number;
}

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AqiMap({ cityData }: { cityData: CityData[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '640px',           // 🔒 FIXED HEIGHT (vertical as you want)
        borderRadius: '18px',
        overflow: 'hidden',
        background: '#0f172a',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
      }}
    >
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={false}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cityData.map((city) => (
          <Marker
            key={city.name}
            position={[city.lat, city.lng]}
            icon={icon}
          >
            <Popup>
              <strong>{city.name}</strong>
              <br />
              AQI: {city.aqi}
              <br />
              {city.level}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

export interface CityData {
  name: string;
  slug: string;
  aqi: number | null;
  dominant: string;
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

/* 🔧 Force Leaflet to recalc size */
function FixMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
}

export default function AqiMap({ cityData = [] }: { cityData?: CityData[] }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <FixMapResize />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cityData.map(city => (
          <Marker
            key={city.slug}
            position={[city.lat, city.lng]}
            icon={icon}
          >
            <Popup>
              <strong>{city.name}</strong>
              <br />
              AQI: {city.aqi ?? '—'}
              <br />
              {city.level}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

/* Default marker icon (Leaflet fix for Next.js) */
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ✅ cityData is OPTIONAL now */
type Props = {
  cityData?: CityData[];
};

export default function AqiMap({ cityData = [] }: Props) {
  return (
    <MapContainer
      center={[22.5937, 78.9629]} // India center
      zoom={5}
      scrollWheelZoom={false}
      style={{
        height: '70vh',      // ⬅ vertical map
        minHeight: '520px',  // ⬅ ensures tall layout
        width: '100%',
        borderRadius: '16px',
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cityData.map((city) => (
        <Marker
          key={city.slug || city.name}
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
  );
}

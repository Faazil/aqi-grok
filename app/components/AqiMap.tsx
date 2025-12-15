'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

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
    <MapContainer
      center={[22.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: '520px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
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
  );
}

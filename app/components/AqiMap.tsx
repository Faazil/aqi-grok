// app/components/AqiMap.tsx
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// The AQI color scheme logic is needed here to color the markers
const getLevelColor = (aqi: number) => {
  if (aqi <= 50) return '#16a34a';   // Green
  if (aqi <= 100) return '#65a30d';  // Lime
  if (aqi <= 200) return '#ca8a04';  // Yellow/Amber
  if (aqi <= 300) return '#ea580c';  // Orange
  if (aqi <= 400) return '#dc2626';  // Red
  return '#7f1d1d';                   // Dark Red/Maroon
};

// --- CORRECTED INTERFACE: ADDED 'color' PROPERTY ---
export interface CityData {
  name: string;
  aqi: number;
  level: string;
  lat: number;
  lng: number;
  color: string; // <-- **FIXED: This property is now required**
}

interface AqiMapProps {
  cityData: CityData[];
}

export default function AqiMap({ cityData }: AqiMapProps) {
  // Center of India (Approx)
  const INDIA_CENTER: [number, number] = [20.5937, 78.9629];
  const INITIAL_ZOOM = 5;

  return (
    <MapContainer 
      center={INDIA_CENTER} 
      zoom={INITIAL_ZOOM} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cityData.map((city) => {
        // Use the color property directly from the CityData object
        const color = city.color; 
        
        return (
          <CircleMarker
            key={city.name}
            center={[city.lat, city.lng]}
            radius={10 + city.aqi / 100} // Radius scales with AQI for visual impact
            pathOptions={{ color: color, fillColor: color, fillOpacity: 0.7, weight: 1.5 }}
          >
            <Popup>
              <div style={{ color: '#333' }}>
                <strong>{city.name}</strong><br />
                AQI: <span style={{ color: color, fontWeight: 'bold' }}>{city.aqi} ({city.level})</span>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

// app/components/AqiMap.tsx
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper to determine color based on AQI
const getLevelColor = (aqi: number) => {
  if (aqi <= 50) return '#16a34a';   // Green
  if (aqi <= 100) return '#65a30d';  // Lime
  if (aqi <= 200) return '#ca8a04';  // Yellow/Amber
  if (aqi <= 300) return '#ea580c';  // Orange
  if (aqi <= 400) return '#dc2626';  // Red
  return '#7f1d1d';                   // Dark Red/Maroon
};

// CORRECTED INTERFACE: Includes the required 'color' property
export interface CityData {
  name: string;
  aqi: number;
  level: string;
  lat: number;
  lng: number;
  color: string;
}

interface AqiMapProps {
  cityData: CityData[];
  // NEW PROP: The coordinates to focus on when a list item is clicked
  focusCoords: [number, number] | null; 
}

// NEW COMPONENT: Controls the map's view using the Leaflet API
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function AqiMap({ cityData, focusCoords }: AqiMapProps) {
  const INDIA_CENTER: [number, number] = [20.5937, 78.9629];
  const INITIAL_ZOOM = 5;

  // Determine the current center and zoom level
  const center = focusCoords || INDIA_CENTER;
  const zoom = focusCoords ? 9 : INITIAL_ZOOM; // Zoom in if coords are provided

  return (
    <MapContainer 
      center={INDIA_CENTER} 
      zoom={INITIAL_ZOOM} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)' }}
    >
      {/* Renders the ChangeView component to dynamically update center/zoom */}
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cityData.map((city) => {
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

"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { CityData } from "../page";

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ cityData }: { cityData: CityData[] }) {
  const map = useMap();

  useEffect(() => {
    if (cityData.length === 0) {
      // Fallback to India
      map.setView([22.5937, 78.9629], 5);
      return;
    }

    const bounds = L.latLngBounds(
      cityData.map((c) => [c.lat, c.lon])
    );

    map.fitBounds(bounds, { padding: [40, 40] });
  }, [cityData, map]);

  return null;
}

export default function AqiMap({
  cityData,
}: {
  cityData: CityData[];
}) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds cityData={cityData} />

        {cityData.map((city, idx) => (
          <Marker key={idx} position={[city.lat, city.lon]}>
            <Popup>
              <strong>{city.city}</strong>
              <br />
              AQI: {city.aqi}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

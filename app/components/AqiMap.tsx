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

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FixMapResize() {
  const map = useMap();

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(t);
  }, [map]);

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
        <FixMapResize />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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

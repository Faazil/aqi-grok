"use client";

import { useEffect, useState } from "react";
import AqiMap from "./components/AqiMap";

export interface CityData {
  city: string;
  lat: number;
  lon: number;
  aqi: number;
}

export default function HomePage() {
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    fetch("/api/all")
      .then((res) => res.json())
      .then((data: CityData[]) => {
        if (Array.isArray(data)) {
          setCityData(data);
        } else {
          setCityData([]);
        }
      })
      .catch(() => setCityData([]));
  }, []);

  return (
    <main className="page">
      <h1>India AQI Dashboard</h1>
      <AqiMap cityData={cityData} />
    </main>
  );
}

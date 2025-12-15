"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export interface CityData {
  city: string;
  lat: number;
  lon: number;
  aqi: number;
}

const AqiMap = dynamic(() => import("./components/AqiMap"), {
  ssr: false,
  loading: () => <p>Loading map…</p>,
});

export default function HomePage() {
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    fetch("/api/all")
      .then((res) => res.json())
      .then((data: CityData[]) => {
        if (Array.isArray(data)) {
          // Filter invalid coordinates
          const valid = data.filter(
            (c) =>
              typeof c.lat === "number" &&
              typeof c.lon === "number" &&
              !isNaN(c.lat) &&
              !isNaN(c.lon)
          );
          setCityData(valid);
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

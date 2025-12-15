"use client";

import { useEffect, useMemo, useState } from "react";
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
          const valid = data.filter(
            (c) =>
              typeof c.lat === "number" &&
              typeof c.lon === "number" &&
              typeof c.aqi === "number" &&
              !isNaN(c.lat) &&
              !isNaN(c.lon) &&
              !isNaN(c.aqi)
          );
          setCityData(valid);
        } else {
          setCityData([]);
        }
      })
      .catch(() => setCityData([]));
  }, []);

  // 🔴 Worst AQI (highest values)
  const worstAQI = useMemo(
    () =>
      [...cityData]
        .sort((a, b) => b.aqi - a.aqi)
        .slice(0, 5),
    [cityData]
  );

  // 🟢 Best AQI (lowest values)
  const bestAQI = useMemo(
    () =>
      [...cityData]
        .sort((a, b) => a.aqi - b.aqi)
        .slice(0, 5),
    [cityData]
  );

  return (
    <main className="page">
      <h1>India AQI Dashboard</h1>

      <div className="top-panels">
        <div className="panel worst">
          <h3>Worst AQI (Top 5)</h3>
          {worstAQI.length === 0 ? (
            <p>No data</p>
          ) : (
            <ul>
              {worstAQI.map((c, i) => (
                <li key={i}>
                  <span>{c.city}</span>
                  <strong>{c.aqi}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel best">
          <h3>Best AQI (Top 5)</h3>
          {bestAQI.length === 0 ? (
            <p>No data</p>
          ) : (
            <ul>
              {bestAQI.map((c, i) => (
                <li key={i}>
                  <span>{c.city}</span>
                  <strong>{c.aqi}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <AqiMap cityData={cityData} />
    </main>
  );
}

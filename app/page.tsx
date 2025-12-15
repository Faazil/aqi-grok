'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

type CityAQI = {
  name: string;
  aqi: number;
};

export default function HomePage() {
  const [worst, setWorst] = useState<CityAQI[]>([]);
  const [best, setBest] = useState<CityAQI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTop5() {
      try {
        const res = await fetch('/api/india');
        const data = await res.json();

        setWorst(data.worst || []);
        setBest(data.best || []);
      } catch (e) {
        console.error('Failed to load AQI', e);
      } finally {
        setLoading(false);
      }
    }

    loadTop5();
  }, []);

  return (
    <>
      {/* 🔴 Worst AQI (Top 5) */}
      <section>
        <h3>🚨 Worst AQI (Top 5)</h3>
        {loading
          ? 'Loading...'
          : worst.map((c) => (
              <div key={c.name} className="aqi-bad">
                <span>{c.name}</span>
                <span>{c.aqi}</span>
              </div>
            ))}
      </section>

      {/* 🟢 Best AQI (Top 5) */}
      <section>
        <h3>🌱 Best AQI (Top 5)</h3>
        {loading
          ? 'Loading...'
          : best.map((c) => (
              <div key={c.name} className="aqi-good">
                <span>{c.name}</span>
                <span>{c.aqi}</span>
              </div>
            ))}
      </section>

      {/* Map remains untouched */}
      <AqiMap />
    </>
  );
}

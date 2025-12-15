'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const AqiMap = dynamic(() => import('./components/AqiMap'), { ssr: false });

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  async function handleSearch() {
    if (!query) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/india?city=${query}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      {/* LEFT — TOP AQI LIST (unchanged UI) */}
      <aside className="left">
        {/* your existing Top 5 Worst + Best blocks */}
      </aside>

      {/* CENTER */}
      <section className="center">
        <h1>Live AQI India</h1>

        <div className="aqi-box">
          <div className="aqi-value">181</div>
          <div className="aqi-label">National Average AQI</div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search any Indian city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="meta">
          • Live · Last updated 2:57 AM
        </div>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <strong>{result.city}</strong>
            <div>AQI: {result.aqi}</div>
            <div>Dominant pollutant: {result.dominant}</div>
            <div>Updated: {result.updated}</div>
          </div>
        )}
      </section>

      {/* RIGHT — MAP */}
      <aside className="right">
        <AqiMap cityData={[]} />
      </aside>

      {/* FOOTER */}
      <footer className="footer">
        👁 Visitors today: 8
      </footer>
    </main>
  );
}

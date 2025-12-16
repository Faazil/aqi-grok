'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { CityData } from './components/AqiMap';

// Import Map dynamically to avoid SSR issues
const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

// 1. Replace this with your actual token from https://aqicn.org/data-platform/token/
// Use 'demo' only for testing (it has rate limits and restricted cities)
const API_TOKEN = 'demo'; 

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial list of cities to fetch on load
  const initialCities = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Lucknow', 'Jaipur', 
    'Patna', 'Gurugram', 'Noida', 'Chandigarh'
  ];

  // Helper to determine color based on AQI
  const getLevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: '#16a34a' }; // Green
    if (aqi <= 100) return { level: 'Satisfactory', color: '#65a30d' }; // Lime
    if (aqi <= 200) return { level: 'Moderate', color: '#ca8a04' }; // Yellow
    if (aqi <= 300) return { level: 'Poor', color: '#ea580c' }; // Orange
    if (aqi <= 400) return { level: 'Very Poor', color: '#dc2626' }; // Red
    return { level: 'Severe', color: '#7f1d1d' }; // Dark Red
  };

  // Fetch AQI for a single city
  const fetchCityAqi = async (cityName: string) => {
    try {
      const res = await fetch(`https://api.waqi.info/feed/${cityName}/?token=${API_TOKEN}`);
      const data = await res.json();

      if (data.status === 'ok') {
        const aqi = data.data.aqi;
        // API sometimes returns text like "No data", handle that
        if (typeof aqi !== 'number') return null;

        const { level, color } = getLevel(aqi);
        
        return {
          name: cityName, // Use the name we searched for to keep it clean
          aqi: aqi,
          level: level,
          // API returns geo as [lat, lng]
          lat: data.data.city.geo[0], 
          lng: data.data.city.geo[1],
          color: color
        } as CityData & { color: string };
      }
    } catch (err) {
      console.error(`Failed to fetch data for ${cityName}`, err);
    }
    return null;
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const promises = initialCities.map(city => fetchCityAqi(city));
      const results = await Promise.all(promises);
      
      // Filter out failed requests (nulls)
      const validCities = results.filter((c): c is NonNullable<typeof c> => c !== null);
      
      setCities(validCities);
      setLoading(false);
    };

    loadData();
  }, []);

  // Handle Search
  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);

    const result = await fetchCityAqi(search);
    
    if (result) {
      // Add the new city to the list if it's not already there
      setCities(prev => {
        const exists = prev.find(c => c.name.toLowerCase() === result.name.toLowerCase());
        if (exists) return prev.map(c => c.name.toLowerCase() === result.name.toLowerCase() ? result : c);
        return [...prev, result];
      });
      setSearch(''); // Clear input
    } else {
      setError(`Could not find data for "${search}"`);
    }
    setLoading(false);
  };

  // Derive "Worst" and "Best" lists dynamically
  const sortedCities = [...cities].sort((a, b) => b.aqi - a.aqi); // High to Low
  const worstCities = sortedCities.slice(0, 5);
  const bestCities = [...cities].sort((a, b) => a.aqi - b.aqi).slice(0, 5); // Low to High
  
  // Calculate National Average (Simple mean of loaded cities)
  const avgAqi = cities.length > 0 
    ? Math.round(cities.reduce((acc, curr) => acc + curr.aqi, 0) / cities.length) 
    : 0;

  return (
    <main className="page">
      <div className="layout">
        {/* LEFT PANEL */}
        <aside className="panel">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {loading && cities.length === 0 ? <p>Loading data...</p> : (
            worstCities.map((c) => (
              <div
                key={c.name}
                className="aqi-row"
                style={{ background: c.color }}
              >
                <span>{c.name}</span>
                <span>{c.aqi}</span>
              </div>
            ))
          )}

          <h3 style={{ marginTop: 24 }}>🌱 Best AQI (Top 5)</h3>
          {loading && cities.length === 0 ? <p>Loading data...</p> : (
            bestCities.map((c) => (
              <div
                key={c.name}
                className="aqi-row"
                style={{ background: c.color }} // Use dynamic color
              >
                <span>{c.name}</span>
                <span>{c.aqi}</span>
              </div>
            ))
          )}
        </aside>

        {/* CENTER PANEL */}
        <section className="center">
          <h1>Live AQI India</h1>

          <div className="aqi-card">
            <div className="value">{loading ? '...' : avgAqi}</div>
            <div className="label">National Avg AQI</div>
          </div>

          <div className="search-box">
            <input
              placeholder="Search any city (e.g. Surat)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? '...' : 'Search'}
            </button>
          </div>
          
          {error && <p style={{ color: '#f87171', marginTop: 10 }}>{error}</p>}

          <div className="meta">
            ● Live Data · {cities.length} cities tracked
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside>
          <AqiMap cityData={cities} />
        </aside>
      </div>
    </main>
  );
}

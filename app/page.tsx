// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { CityData } from './components/AqiMap';

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const API_TOKEN = process.env.NEXT_PUBLIC_WAQI_TOKEN;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null); 
  // NEW STATE: For tracking the real visitor count
  const [visitorCount, setVisitorCount] = useState<number | null>(null); 

  // ... (initialCities, getLevel, fetchCityAqi, handleSearch, handleCityClick functions remain the same) ...

  const initialCities = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Lucknow', 'Jaipur', 
    'Patna', 'Gurugram', 'Noida', 'Chandigarh'
  ];

  const getLevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: '#16a34a' };
    if (aqi <= 100) return { level: 'Satisfactory', color: '#65a30d' };
    if (aqi <= 200) return { level: 'Moderate', color: '#ca8a04' };
    if (aqi <= 300) return { level: 'Poor', color: '#ea580c' };
    if (aqi <= 400) return { level: 'Very Poor', color: '#dc2626' };
    return { level: 'Severe', color: '#7f1d1d' };
  };

  const fetchCityAqi = async (cityName: string): Promise<CityData | null> => {
    // Note: Fetch logic remains as in the previous complete file
    // ... (rest of fetchCityAqi function)
    if (!API_TOKEN || API_TOKEN === 'demo') {
        const token = API_TOKEN || 'demo';
        try {
            const res = await fetch(`https://api.waqi.info/feed/${cityName}/?token=${token}`);
            const data = await res.json();

            if (data.status === 'ok') {
                const aqi = data.data.aqi;
                if (typeof aqi !== 'number') return null;
                const { level, color } = getLevel(aqi);
                return {
                    name: cityName,
                    aqi: aqi,
                    level: level,
                    lat: data.data.city.geo[0], 
                    lng: data.data.city.geo[1],
                    color: color
                } as CityData;
            }
        } catch (err) {
            console.error(`Failed to fetch data for ${cityName}`, err);
        }
        return null;
    }
    
    // Original fetch logic using real token
    try {
      const res = await fetch(`https://api.waqi.info/feed/${cityName}/?token=${API_TOKEN}`);
      const data = await res.json();

      if (data.status === 'ok') {
        const aqi = data.data.aqi;
        
        if (typeof aqi !== 'number') return null;

        const { level, color } = getLevel(aqi);
        
        return {
          name: cityName,
          aqi: aqi,
          level: level,
          lat: data.data.city.geo[0], 
          lng: data.data.city.geo[1],
          color: color
        } as CityData;
      }
    } catch (err) {
      console.error(`Failed to fetch data for ${cityName}`, err);
    }
    return null;
  };
  
  // NEW useEffect for Visitor Count
  useEffect(() => {
    const fetchVisitorCount = async () => {
        try {
            // Call the new API route
            const res = await fetch('/api/visits');
            const data = await res.json();
            
            if (res.ok) {
                setVisitorCount(data.count);
            } else {
                console.error('Visitor API Error:', data.error);
                setVisitorCount(null); // Keep it null on error
            }
        } catch (err) {
            console.error('Network or parsing error for visitor count', err);
            setVisitorCount(null);
        }
    };
    
    fetchVisitorCount();
  }, []); // Run only once on mount

  useEffect(() => {
    // ... (rest of initial city data load logic)
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      const promises = initialCities.map(city => fetchCityAqi(city));
      const results = await Promise.all(promises);
      
      const validCities = results.filter((c): c is CityData => c !== null);
      
      setCities(validCities);
      setLoading(false);
      
      if (!API_TOKEN) {
         setError("WARNING: AQI Token is missing. Using restricted 'demo' mode.");
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);

    const result = await fetchCityAqi(search);
    
    if (result) {
      setCities(prev => {
        const exists = prev.find(c => c.name.toLowerCase() === result.name.toLowerCase());
        if (exists) return prev.map(c => c.name.toLowerCase() === result.name.toLowerCase() ? result : c);
        return [...prev, result];
      });
      setFocusCoords([result.lat, result.lng]); 
      setSearch('');
    } else {
        if (!error || !error.includes("AQI Token is missing")) { 
            setError(`Could not find data for "${search}" or the city name is invalid.`);
        }
    }
    setLoading(false);
  };

  const handleCityClick = (city: CityData) => {
    setFocusCoords([city.lat, city.lng]);
  };

  const sortedCities = [...cities].sort((a, b) => b.aqi - a.aqi);
  const worstCities = sortedCities.slice(0, 5);
  const bestCities = [...cities].sort((a, b) => a.aqi - a.aqi).slice(0, 5);
  
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
                className="aqi-row clickable-row"
                style={{ background: c.color }} 
                onClick={() => handleCityClick(c)}
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
                className="aqi-row clickable-row"
                style={{ background: c.color }}
                onClick={() => handleCityClick(c)}
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
          
          {error && <p style={{ color: error.includes("WARNING") ? '#ffc107' : '#f87171', marginTop: 10 }}>{error}</p>}

          <div className="meta">
            ● Live Data · {cities.length} cities tracked
            <button 
                onClick={() => setFocusCoords(null)} 
                style={{ background: 'none', border: 'none', color: 'white', marginLeft: '10px', textDecoration: 'underline', cursor: 'pointer', opacity: focusCoords ? 1 : 0.5 }}
                disabled={!focusCoords}
            >
                (Reset Map View)
            </button>
          </div>

          {/* UPDATED: Display dynamic visitor count */}
          <div className="visitors">
            👁 Visitors today: {visitorCount === null ? '...' : visitorCount.toLocaleString()}
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside>
          <AqiMap cityData={cities} focusCoords={focusCoords} />
        </aside>
      </div>
    </main>
  );
}

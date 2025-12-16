// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import type { CityData } from './components/AqiMap';
import { useDebounce } from './hooks/useDebounce'; 

const AqiMap = dynamic(() => import('./components/AqiMap'), {
  ssr: false,
});

const API_TOKEN = process.env.NEXT_PUBLIC_WAQI_TOKEN;

// --- Skeleton Component ---
const SkeletonRow = () => (
    <div className="aqi-row aqi-row-skeleton skeleton-box" style={{height: 40}}></div>
);

// --- Main Component ---
export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null); 
  const [visitorData, setVisitorData] = useState<{totalHits: number, uniqueVisitors: number} | null>(null); 
  
  const debouncedSearch = useDebounce(search, 500); 

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

  const fetchCityAqi = useCallback(async (cityName: string): Promise<CityData | null> => {
    // Uses 'demo' key if real token is missing
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
  }, []);

  const handleDebouncedSearch = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);

    const result = await fetchCityAqi(searchTerm);
    
    if (result) {
      setCities(prev => {
        const exists = prev.find(c => c.name.toLowerCase() === result.name.toLowerCase());
        if (exists) return prev.map(c => c.name.toLowerCase() === result.name.toLowerCase() ? result : c);
        return [...prev, result];
      });
      setFocusCoords([result.lat, result.lng]); 
    } else {
        if (!error || !error.includes("AQI Token is missing")) { 
            if (searchTerm === search) {
                setError(`Could not find data for "${searchTerm}" or the city name is invalid.`);
            }
        }
    }
    setLoading(false);
  }, [fetchCityAqi, search, error]);

  // EFFECT: Watches debouncedSearch and automatically triggers API call
  useEffect(() => {
    // Only search if input is not empty and the city is not already loaded
    if (debouncedSearch.trim() && !cities.find(c => c.name.toLowerCase() === debouncedSearch.toLowerCase())) {
        handleDebouncedSearch(debouncedSearch);
    }
  }, [debouncedSearch, cities, handleDebouncedSearch]);

  // Handler for explicit button click (overrides debounce)
  const handleExplicitSearchClick = () => {
    if (search.trim()) {
        handleDebouncedSearch(search);
    }
  };

  // EFFECT: Initial Data Load and Visitor Count Fetch
  useEffect(() => {
    const fetchVisitorCount = async () => {
        try {
            const res = await fetch('/api/visits');
            const data = await res.json();
            
            if (res.ok) {
                setVisitorData({totalHits: data.totalHits, uniqueVisitors: data.uniqueVisitors});
            }
        } catch (err) {
            console.error('Visitor API Error:', err);
        }
    };
    
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
    fetchVisitorCount();
  }, [fetchCityAqi]);

  const handleCityClick = (city: CityData) => {
    setFocusCoords([city.lat, city.lng]);
  };

  const sortedCities = [...cities].sort((a, b) => b.aqi - a.aqi);
  const worstCities = sortedCities.slice(0, 5);
  const bestCities = [...cities].sort((a, b) => a.aqi - b.aqi).slice(0, 5);
  
  const avgAqi = cities.length > 0 
    ? Math.round(cities.reduce((acc, curr) => acc + curr.aqi, 0) / cities.length) 
    : 0;

  return (
    <main className="page">
      <div className="layout">
        {/* LEFT PANEL */}
        <aside className="panel">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {loading ? (
             // Renders 5 skeleton rows while loading
             Array(5).fill(0).map((_, i) => <SkeletonRow key={`worst-${i}`} />)
          ) : (
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
          {loading ? (
             // Renders 5 skeleton rows while loading
             Array(5).fill(0).map((_, i) => <SkeletonRow key={`best-${i}`} />)
          ) : (
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
            <div className="value">
              {loading ? (
                // Renders skeleton for average AQI value
                <div className="skeleton-box aqi-card-skeleton" />
              ) : avgAqi}
            </div>
            <div className="label">National Avg AQI</div>
          </div>

          <div className="search-box">
            <input
              placeholder="Search any city (e.g. Surat)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExplicitSearchClick()}
            />
            <button onClick={handleExplicitSearchClick} disabled={loading}>
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

          <div className="visitors">
            👁 Visitors today: {visitorData === null ? '...' : visitorData.uniqueVisitors.toLocaleString()}
            {visitorData !== null && visitorData.totalHits > visitorData.uniqueVisitors && (
                <span style={{ marginLeft: 10, opacity: 0.7, fontSize: '0.9em' }}>
                    ({visitorData.totalHits} total hits)
                </span>
            )}
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

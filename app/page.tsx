// app/page.tsx (FINAL VERSION WITH AUTO-REFRESH, SEARCH RESULT DISPLAY, AND FOOTER)
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CityData } from './components/AqiMap';
import MapWrapper from './components/MapWrapper'; 
import { useInterval } from './hooks/useInterval'; 
import Footer from './components/Footer'; // NEW IMPORT: Footer component

const API_TOKEN = process.env.NEXT_PUBLIC_WAQI_TOKEN;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// --- Skeleton Component ---
const SkeletonRow = () => (
    <div className="aqi-row aqi-row-skeleton skeleton-box" style={{height: 40}}></div>
);

// --- Component to display the search result AQI ---
const SearchResultAqiDisplay = ({ city }: { city: CityData }) => {
    return (
        <div 
            className="aqi-card search-result-card" 
            style={{ 
                margin: '15px auto', 
                maxWidth: '300px', 
                background: city.color,
                color: '#000' 
            }}
        >
            <div className="value" style={{fontSize: '32px'}}>
                {city.aqi}
            </div>
            <div className="label" style={{fontWeight: 'bold'}}>
                {city.name} ({city.level})
            </div>
        </div>
    );
};


// --- Main Component ---
export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null); 
  const [visitorCount, setVisitorCount] = useState<number | null>(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null); 
  const [searchedCityResult, setSearchedCityResult] = useState<CityData | null>(null);
  
  // DEFINITIVE LIST: 50 Major Cities and State/UT Capitals of India
  const initialCities = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur',
    'Lucknow', 'Patna', 'Kanpur', 'Nagpur', 'Indore',
    'Thane', 'Bhopal', 'Visakhapatnam', 'Vadodara', 'Ghaziabad',
    'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Varanasi',
    'Amritsar', 'Noida', 'Gurugram', 'Chandigarh', 'Coimbatore',
    'Kochi', 'Madurai', 'Tiruchirappalli', 'Guwahati', 'Bhubaneswar',
    'Ranchi', 'Raipur', 'Dehradun', 'Shimla', 'Jabalpur',
    'Jodhpur', 'Srinagar', 'Jammu', 'Puducherry', 'Panaji',
    'Amaravati', 'Dispur', 'Aizawl', 'Shillong', 'Itanagar'
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

  const refreshCityData = useCallback(async (isInitialLoad: boolean = false) => {
    if (isInitialLoad) {
      setLoading(true);
      setError(null);
    } else {
      console.log('Auto-refreshing city data...');
    }

    const cityNamesToFetch = isInitialLoad ? initialCities : cities.map(c => c.name);
    
    const promises = cityNamesToFetch.map(city => fetchCityAqi(city));
    const results = await Promise.all(promises);
    
    const validCities = results.filter((c): c is CityData => c !== null);
    
    setCities(validCities);
    setLastUpdated(new Date()); 
    
    if (isInitialLoad) {
      setLoading(false);
      if (!API_TOKEN) {
         setError("WARNING: AQI Token is missing. Using restricted 'demo' mode.");
      }
    }
  }, [fetchCityAqi, initialCities, cities]);

  // Hook 1: Initial Data Load (Runs once on mount)
  useEffect(() => {
    refreshCityData(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Hook 2: Auto-Refresh using useInterval
  useInterval(() => {
    if (!loading) {
        refreshCityData(false);
    }
  }, REFRESH_INTERVAL_MS);

  // handleSearch FUNCTION
  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setSearchedCityResult(null); 
    setError(null);

    const result = await fetchCityAqi(search);
    
    if (result) {
      setCities(prev => {
        const exists = prev.find(c => c.name.toLowerCase() === result.name.toLowerCase());
        
        if (exists) {
            return prev.map(c => c.name.toLowerCase() === result.name.toLowerCase() ? result : c);
        }
        
        return [...prev, result];
      });
      
      setFocusCoords([result.lat, result.lng]); 
      setSearchedCityResult(result); 
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
  const bestCities = [...cities].sort((a, b) => a.aqi - b.aqi).slice(0, 5);
  
  const avgAqi = cities.length > 0 
    ? Math.round(cities.reduce((acc, curr) => acc + curr.aqi, 0) / cities.length) 
    : 0;
    
  const timeDisplay = lastUpdated
    ? lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    : '...';

  return (
    <main className="page">
      <div className="layout">
        {/* LEFT PANEL */}
        <aside className="panel">
          <h3>🚨 Worst AQI (Top 5)</h3>
          {loading ? (
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? '...' : 'Search'}
            </button>
          </div>
          
          {searchedCityResult && <SearchResultAqiDisplay city={searchedCityResult} />}
          
          {error && <p style={{ color: error.includes("WARNING") ? '#ffc107' : '#f87171', marginTop: 10 }}>{error}</p>}

          <div className="meta">
            ● Live Data · {cities.length} cities tracked. Last updated: {timeDisplay}
            <button 
                onClick={() => setFocusCoords(null)} 
                style={{ background: 'none', border: 'none', color: 'white', marginLeft: '10px', textDecoration: 'underline', cursor: 'pointer', opacity: focusCoords ? 1 : 0.5 }}
                disabled={!focusCoords}
            >
                (Reset Map View)
            </button>
          </div>

          <div className="visitors">
            👁 Visitors today: {visitorCount}
          </div>
        </section>

        {/* RIGHT PANEL: The Map Wrapper Component */}
        <aside>
          <MapWrapper cityData={cities} focusCoords={focusCoords} />
        </aside>
      </div>

      {/* FOOTER RENDERED OUTSIDE THE GRID LAYOUT */}
      <Footer />
    </main>
  );
}

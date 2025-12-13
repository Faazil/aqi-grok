'use client';

import { useState, useEffect } from 'react';

const CITIES = [
  { name: 'Delhi', aqi: 568, dominant: 'PM2.5', level: 'Hazardous' },
  { name: 'Mumbai', aqi: 164, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Bengaluru', aqi: 106, dominant: 'PM2.5', level: 'Poor' },
  { name: 'Hyderabad', aqi: 130, dominant: 'PM2.5', level: 'Moderate' },
  { name: 'Chennai', aqi: 114, dominant: 'PM2.5', level: 'Moderate' },
  { name: 'Kolkata', aqi: 200, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Ahmedabad', aqi: 117, dominant: 'PM2.5', level: 'Moderate' },
  { name: 'Pune', aqi: 200, dominant: 'PM2.5', level: 'Unhealthy' },
  { name: 'Jaipur', aqi: 180, dominant: 'PM2.5', level: 'Unhealthy for Sensitive' },
  { name: 'Lucknow', aqi: 513, dominant: 'PM2.5', level: 'Hazardous' },
];

const TOKEN = 'YOUR_WAQI_TOKEN_HERE'; // Replace for live data!

interface CityData {
  name: string;
  aqi: number | null;
  dominant: string;
  level: string;
}

function getAqiColor(aqi: number | null) {
  if (!aqi) return { backgroundColor: '#9CA3AF' };
  if (aqi <= 50) return { backgroundColor: '#10B981' };
  if (aqi <= 100) return { backgroundColor: '#F59E0B' };
  if (aqi <= 150) return { backgroundColor: '#F97316' };
  if (aqi <= 200) return { backgroundColor: '#EF4444' };
  if (aqi <= 300) return { backgroundColor: '#A855F7' };
  return { backgroundColor: '#1F2937' };
}

function getAqiLevel(aqi: number | null) {
  if (!aqi) return 'Loading...';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export default function Home() {
  const [cityData, setCityData] = useState<CityData[]>(CITIES);
  const [loading, setLoading] = useState(false);

  // Live fetch (if token set)
  useEffect(() => {
    if (TOKEN !== 'YOUR_WAQI_TOKEN_HERE') {
      const fetchData = async () => {
        setLoading(true);
        try {
          const promises = CITIES.map(async (city) => {
            const res = await fetch(`https://api.waqi.info/feed/${city.slug}/?token=${TOKEN}`);
            const json = await res.json();
            if (json.status !== 'ok') return city;
            const data = json.data;
            return {
              name: city.name,
              aqi: data.aqi || null,
              dominant: data.dominentpol || 'PM2.5',
              level: getAqiLevel(data.aqi),
            };
          });
          const results = await Promise.all(promises);
          setCityData(results);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      const interval = setInterval(fetchData, 300000);
      return () => clearInterval(interval);
    }
  }, []);

  const nationalAverage = Math.round(CITIES.reduce((sum, c) => sum + c.aqi, 0) / CITIES.length);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #dbeafe, #e0f2fe)', margin: 0, padding: 0 }}>
      {/* Hero */}
      <header style={{ position: 'relative', padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))', color: 'white' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", backgroundSize: 'cover', opacity: 0.3 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0 0 20px 0' }}>Live AQI India</h1>
          <p style={{ fontSize: '1.5rem', margin: '0 0 40px 0' }}>Real-Time Air Quality Dashboard</p>
          <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '6rem', fontWeight: 'bold', color: '#6366f1', margin: 0 }}>{nationalAverage}</p>
            <p style={{ fontSize: '1.5rem', color: '#6366f1', margin: '10px 0 0 0' }}>{getAqiLevel(nationalAverage)}</p>
            <p style={{ fontSize: '1rem', color: '#6366f1', margin: '5px 0 0 0' }}>National Average</p>
          </div>
        </div>
      </header>

      {/* Cards */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', margin: '0 0 60px 0', color: '#1f2937' }}>Major Cities Live AQI</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '30px' }}>
          {cityData.map((city) => {
            const color = getAqiColor(city.aqi);
            return (
              <div key={city.name} style={{ background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'} >
                <div style={{ ...color, height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  <p style={{ fontSize: '4rem', margin: 0 }}>{city.aqi}</p>
                  <p style={{ fontSize: '1.2rem', margin: '10px 0 0 0' }}>{city.level}</p>
                </div>
                <div style={{ padding: '30px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 10px 0' }}>{city.name}</h3>
                  <p style={{ fontSize: '1rem', color: '#6b7280', margin: 0 }}>{city.dominant} dominant</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Health Tips */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', margin: '0 0 40px 0', color: '#1f2937' }}>Health Tips for Current Conditions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '30px' }}>
          <div style={{ padding: '30px', background: 'linear-gradient(to bottom right, #ecfdf5, #d1fae5)', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>😷</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#065f46' }}>Wear N95 Masks Outdoors</h3>
            <p style={{ fontSize: '1rem', color: '#065f46', margin: 0 }}>Critical in Hazardous cities like Delhi</p>
          </div>
          <div style={{ padding: '30px', background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>🏠</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#92400e' }}>Stay Indoors</h3>
            <p style={{ fontSize: '1rem', color: '#92400e', margin: 0 }}>Avoid exertion in Unhealthy areas</p>
          </div>
          <div style={{ padding: '30px', background: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff)', borderRadius: '16px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>🌬️</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#7c3aed' }}>Use Air Purifiers</h3>
            <p style={{ fontSize: '1rem', color: '#7c3aed', margin: 0 }}>Keep windows closed</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', margin: 0 }}>&copy; 2025 Live AQI India • Breathe Better, Live Healthier</p>
        <p style={{ fontSize: '1rem', opacity: 0.9, margin: '10px 0 0 0' }}>Data sourced from WAQI.info</p>
      </footer>
    </div>
  );
}

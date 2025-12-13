'use client';

import { useState, useEffect } from 'react';
import AqiMap from './components/AqiMap'; // Import the map component

const CITIES = [
  { name: 'Delhi', slug: 'delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567 },
];

const TOKEN = 'ccf9886c6c972e354ecebca2730511ec2e928183'; // Replace!

interface CityData {
  name: string;
  aqi: number | null;
  dominant: string;
  level: string;
  lat: number;
  lng: number;
}

function getAqiColor(aqi: number | null): string {
  // same as before
  if (!aqi) return 'bg-gray-400';
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-gray-900';
}

function getAqiLevel(aqi: number | null): string {
  // same as before
  if (!aqi) return 'Loading...';
  if (aqi <= 50) return 'Good';
  // ...
  return 'Hazardous';
}

export default function Home() {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  // same fetch useEffect as before...

  const nationalAverage = /* same calculation */;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-100">
      {/* Hero with national average */}
      {/* ... same hero */}

      {/* Map Section */}
      <section className="mx-4 my-12 h-96 rounded-3xl overflow-hidden shadow-2xl">
        <AqiMap cityData={cityData} />
      </section>

      {/* City Cards Grid */}
      {/* ... same grid */}

      {/* Health Tips & Footer */}
    </div>
  );
}

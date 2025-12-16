// app/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { CityData } from './AqiMap'; 
import { useState, useEffect } from 'react';

// Use dynamic import with ssr: false inside a client component
const AqiMap = dynamic(() => import('./AqiMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading state
});

interface MapWrapperProps {
  cityData: CityData[];
  focusCoords: [number, number] | null;
}

export default function MapWrapper({ cityData, focusCoords }: MapWrapperProps) {
  // CRITICAL FIX: Ensure the map component is only rendered after the component has mounted 
  // in the browser (i.e., when 'window' is available). This prevents the initial server render
  // from trying to evaluate the dynamic AqiMap component.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isClient ? (
        <AqiMap cityData={cityData} focusCoords={focusCoords} />
      ) : (
        // Render a placeholder on the server and during initial client mount
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', borderRadius: '16px' }}>
          <p style={{ color: '#ccc' }}>Initializing Map...</p>
        </div>
      )}
    </div>
  );
}

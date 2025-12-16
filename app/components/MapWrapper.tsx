// app/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
// Assuming CityData is exported from AqiMap.tsx or a types file
import type { CityData } from './AqiMap'; 

// Use dynamic import with ssr: false inside this client component
const AqiMap = dynamic(() => import('./AqiMap'), {
  ssr: false,
  loading: () => <p style={{color: '#ccc', textAlign: 'center'}}>Loading map...</p>, 
});

interface MapWrapperProps {
  cityData: CityData[];
  focusCoords: [number, number] | null;
}

export default function MapWrapper({ cityData, focusCoords }: MapWrapperProps) {
  // CRITICAL FIX: Ensure the map component is only rendered after the component has mounted 
  // in the browser (i.e., when 'window' is available).
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs ONLY on the client after the initial render
    setIsClient(true);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      {isClient ? (
        <AqiMap cityData={cityData} focusCoords={focusCoords} />
      ) : (
        // Render a placeholder on the server and during initial client mount
        <div style={{ height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', borderRadius: '16px' }}>
          <p style={{ color: '#ccc' }}>Initializing Map...</p>
        </div>
      )}
    </div>
  );
}

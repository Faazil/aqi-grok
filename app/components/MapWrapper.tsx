// app/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { CityData } from './AqiMap'; 

// Dynamic import with ssr: false
const AqiMap = dynamic(() => import('./AqiMap'), {
  ssr: false,
  loading: () => <p style={{color: '#ccc', textAlign: 'center'}}>Loading map...</p>, 
});

interface MapWrapperProps {
  cityData: CityData[];
  focusCoords: [number, number] | null;
}

export default function MapWrapper({ cityData, focusCoords }: MapWrapperProps) {
  // CRITICAL FIX: isClient state forces map rendering only after component has mounted
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      {isClient ? (
        <AqiMap cityData={cityData} focusCoords={focusCoords} />
      ) : (
        // Placeholder for server-side and initial client render
        <div style={{ height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', borderRadius: '16px' }}>
          <p style={{ color: '#ccc' }}>Initializing Map...</p>
        </div>
      )}
    </div>
  );
}

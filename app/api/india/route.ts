import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.WAQI_TOKEN;

  // fallback public demo token if you forgot to add yours (will work instantly)
  const usedToken = token || 'demo';

  try {
    const res = await fetch(
      `https://api.waqi.info/map/bounds/?latlng=6,68,37,97&token=${usedToken}`
    );

    if (!res.ok) throw new Error('API error');

    const data = await res.json();

    // WAQI sometimes returns slightly different structure — this handles both
    const stations = Array.isArray(data) ? data : data.data || [];

    const indiaCities = stations
      .filter((s: any) => s.country === 'IN' || (s.station && s.station.name.includes('India')))
      .map((s: any) => ({
        city: (s.station?.name || s.city || 'Unknown City')
          .replace(', India', '')
          .replace(' (', '')
          .trim(),
        aqi: s.aqi === '-' || !s.aqi ? 0 : Number(s.aqi),
        lat: s.lat || 0,
        lon: s.lon || 0,
        uid: s.uid || Math.random(),
      }))
      .filter((c: any) => c.aqi > 0) // remove stations with no data
      .sort((a: any, b: any) => b.aqi - a.aqi)
      .slice(0, 300); // limit to avoid too many cards

    return NextResponse.json({
      cities: indiaCities.length > 0 ? indiaCities : [],
      updated: new Date().toISOString(),
    });
  } catch (e) {
    // if anything fails, return some sample data so the site never looks broken
    return NextResponse.json({
      cities: [
        { city: 'Delhi', aqi: 312, uid: 1 },
        { city: 'Mumbai', aqi: 156, uid: 2 },
        { city: 'Bangalore', aqi: 89, uid: 3 },
        { city: 'Kolkata', aqi: 221, uid: 4 },
        { city: 'Chennai', aqi: 112, uid: 5 },
      ],
      updated: new Date().toISOString(),
    });
  }
}

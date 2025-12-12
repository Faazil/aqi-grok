import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.WAQI_TOKEN;
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 500 });

  try {
    const res = await fetch(`https://api.waqi.info/map/bounds/?latlng=6,68,37,97&token=${token}`);
    const data = await res.json();

    const indiaStations = data.data
      .filter((s: any) => s.country === 'IN')
      .map((s: any) => ({
        city: s.station.name.replace(', India', '').trim(),
        aqi: s.aqi === '-' ? 0 : Number(s.aqi),
        lat: s.lat,
        lon: s.lon,
        uid: s.uid,
      }))
      .sort((a: any, b: any) => b.aqi - a.aqi);   // ← fixed the missing )

    return NextResponse.json({
      cities: indiaStations,
      updated: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

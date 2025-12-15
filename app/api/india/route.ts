import { NextResponse } from 'next/server';

const WAQI_TOKEN = process.env.WAQI_TOKEN;

export async function GET() {
  if (!WAQI_TOKEN) {
    return NextResponse.json(
      { error: 'WAQI_TOKEN not set' },
      { status: 500 }
    );
  }

  const url = `https://api.waqi.info/search/?keyword=india&token=${WAQI_TOKEN}`;

  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();

  if (json.status !== 'ok') {
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    );
  }

  // Clean & normalize
  const cities = json.data
    .filter((c: any) => typeof c.aqi === 'number')
    .map((c: any) => ({
      name: c.station.name.split(',')[0],
      aqi: c.aqi,
    }));

  // Sort
  const worst = [...cities]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 5);

  const best = [...cities]
    .sort((a, b) => a.aqi - b.aqi)
    .slice(0, 5);

  return NextResponse.json({
    worst,
    best,
    updatedAt: new Date().toISOString(),
  });
}

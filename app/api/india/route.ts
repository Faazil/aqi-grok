import { NextResponse } from 'next/server';

const WAQI_TOKEN = process.env.WAQI_TOKEN!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || 'India';

  try {
    const res = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${WAQI_TOKEN}`,
      { next: { revalidate: 300 } } // cache 5 mins
    );

    const json = await res.json();

    if (json.status !== 'ok') {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    const d = json.data;

    return NextResponse.json({
      city: d.city.name,
      aqi: d.aqi,
      dominant: d.dominentpol,
      time: d.time.s,
      lat: d.city.geo[0],
      lng: d.city.geo[1],
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    );
  }
}

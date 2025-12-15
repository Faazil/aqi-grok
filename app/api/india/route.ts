import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  const token = process.env.WAQI_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'WAQI token not configured' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`,
      { next: { revalidate: 300 } } // cache 5 min
    );

    const data = await res.json();

    if (data.status !== 'ok') {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      city: data.data.city.name,
      aqi: data.data.aqi,
      dominant: data.data.dominentpol,
      updated: data.data.time.s,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('name');

  if (!city) {
    return NextResponse.json({ error: 'City required' }, { status: 400 });
  }

  const token = process.env.WAQI_TOKEN;

  try {
    const res = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`,
      { next: { revalidate: 300 } } // cache 5 min
    );

    const data = await res.json();

    if (data.status !== 'ok') {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    return NextResponse.json({
      city: data.data.city.name,
      aqi: data.data.aqi,
      dominentpol: data.data.dominentpol,
      iaqi: data.data.iaqi,
      time: data.data.time.s,
    });
  } catch (err) {
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}

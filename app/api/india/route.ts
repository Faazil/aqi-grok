import { NextResponse } from "next/server";

const WAQI_TOKEN = process.env.WAQI_TOKEN;

export async function GET() {
  if (!WAQI_TOKEN) {
    return NextResponse.json(
      { error: "WAQI_TOKEN not set" },
      { status: 500 }
    );
  }

  const url = `https://api.waqi.info/search/?keyword=india&token=${WAQI_TOKEN}`;
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (json.status !== "ok") {
    return NextResponse.json(
      { error: "Failed to fetch AQI data" },
      { status: 500 }
    );
  }

  /**
   * Normalize to frontend contract:
   * { city, lat, lon, aqi }
   */
  const cities = json.data
    .filter(
      (c: any) =>
        typeof c.aqi === "number" &&
        c.station &&
        c.station.geo &&
        Array.isArray(c.station.geo) &&
        c.station.geo.length === 2
    )
    .map((c: any) => ({
      city: c.station.name.split(",")[0],
      lat: Number(c.station.geo[0]),
      lon: Number(c.station.geo[1]),
      aqi: Number(c.aqi),
    }));

  return NextResponse.json(cities);
}

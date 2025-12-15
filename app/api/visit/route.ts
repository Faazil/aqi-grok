import { NextResponse } from 'next/server';

let visits = 0;

export async function GET() {
  visits += 1;

  return NextResponse.json({
    visits,
  });
}

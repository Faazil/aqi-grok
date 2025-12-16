// app/api/visits/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

// --- Redis Client Initialization ---
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set.');
}

const redis = new Redis(redisUrl);
const COUNT_KEY = 'global_visitor_count';

export async function GET(request: NextRequest) {
    try {
        // 1. Increment the count and fetch the new value atomically
        const newCount = await redis.incr(COUNT_KEY);

        // 2. Return the new count
        return NextResponse.json({ count: newCount }, { status: 200 });

    } catch (error) {
        console.error('Redis operation failed:', error);
        // On failure, return a safe, default value or an error
        return NextResponse.json({ 
            error: 'Failed to connect to visitor database.', 
            count: 0 
        }, { status: 500 });
    }
}

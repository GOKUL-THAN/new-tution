import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  let dbStatus: 'ok' | 'unavailable' = 'unavailable';

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'ok';
  } catch {
    dbStatus = 'unavailable';
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    db_status: dbStatus,
  });
}

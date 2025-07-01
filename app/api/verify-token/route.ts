// /app/api/verify-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/utils/firebase/firebase-admin';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return NextResponse.json({ user: decodedToken });
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 },
    );
  }
}

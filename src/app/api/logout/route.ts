import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('API: /api/logout received request.');

    console.log('API: Logout process completed on server side (no server-side session to clear for localStorage auth).');
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  } catch (error) {
    console.error('API: Error during server-side logout:', error);
    return NextResponse.json({ message: 'Failed to logout', error: (error as Error).message }, { status: 500 });
  }
}
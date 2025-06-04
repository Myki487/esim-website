import { NextResponse } from 'next/server';
import { countries } from '@/data/countries'

export async function GET() {
	return NextResponse.json(countries);
}

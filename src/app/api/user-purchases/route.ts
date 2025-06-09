import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function GET(req: Request) {
	console.log('📈 GET /api/user-purchases received');

	const { searchParams } = new URL(req.url);
	const userIdString = searchParams.get('userId');

	if (!userIdString) {
		return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
	}

	const userId = parseInt(userIdString, 10);
	if (isNaN(userId)) {
		return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
	}

	try {
		const purchases = await db.purchase.findMany({
			where: { userId: userId },
			orderBy: { date: 'desc' },
		});

		console.log(`✅ Fetched ${purchases.length} purchases for user ${userId}`);
		return NextResponse.json(purchases, { status: 200 });

	} catch (error: unknown) {
		console.error('❌ Error processing purchase:', error);

		let errorMessage = 'Internal server error';
		const statusCode = 500;

		if (error instanceof PrismaClientKnownRequestError) {
			console.error(`Prisma Error Code: ${error.code}`);
			console.error(`Prisma Error Meta: ${JSON.stringify(error.meta)}`);
			errorMessage = `Database error: ${error.message}`;
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ message: errorMessage, error: errorMessage }, { status: statusCode });
	}
}
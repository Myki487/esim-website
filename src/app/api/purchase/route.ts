import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(req: Request) {
	console.log('📦 POST /api/purchase received');

	try {
		const { userId, countryId, planId, countryName, label, price } = await req.json();

		if (!userId || !countryId || !planId || !countryName || !label || price === undefined) {
			return NextResponse.json({ message: 'Missing required purchase data' }, { status: 400 });
		}

		const userExists = await db.user.findUnique({
			where: { id: userId },
		});

		if (!userExists) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		const purchase = await db.purchase.create({
			data: {
				userId,
				countryId,
				planId,
				countryName,
				label,
				price,
				date: new Date(),
			},
		});

		console.log(`✅ Purchase recorded: ${purchase.id} for user ${userId}`);
		return NextResponse.json({ message: 'Purchase recorded successfully', purchaseId: purchase.id }, { status: 201 });

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
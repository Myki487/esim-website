import { db } from '@/lib/db';

import { compare } from 'bcryptjs';

import { NextResponse } from 'next/server';



export async function POST(req: Request) {

	try {

		const { email, password } = await req.json();



		const user = await db.user.findUnique({

			where: { email },

		});



		if (!user) {

			return NextResponse.json({ message: 'User not found' }, { status: 404 });

		}



		const passwordMatch = await compare(password, user.password);



		if (!passwordMatch) {

			return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

		}



		return NextResponse.json({ message: 'Login successful', userId: user.id, username: user.name, email: user.email }, { status: 200 });



	} catch (error: unknown) {

		console.error('❌ Error during login:', error);

		let errorMessage = 'Internal server error';

		if (error instanceof Error) {

			errorMessage = error.message;

		}

		return NextResponse.json({ message: errorMessage, error: errorMessage }, { status: 500 });

	}

}
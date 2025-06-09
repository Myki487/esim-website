import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	console.log('✅ BOOM!')

	await db.$connect()
	console.log('✅ Connected to database successfully')
	try {
		const { name, email, password } = await req.json()

		if (!name || !email || !password) {
			return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
		}


		console.log('🔍 Connecting to DB...');
		const existingUser = await db.user.findUnique({ where: { email } })
		console.log('✅ DB connection successful');
		if (existingUser) {
			return NextResponse.json({ message: 'User already exists' }, { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

		return NextResponse.json({ message: 'User created successfully', userId: user.id })
	} catch (err) {
		console.error('❌ Error in register:', err)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}

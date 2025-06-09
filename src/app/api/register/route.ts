import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function POST(req: Request) {
  console.log('✅ BOOM! (Register API hit)')

  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    console.log(`🔍 Checking for existing user with email: ${email}`);
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      console.log(`⚠️ User with email ${email} already exists.`);
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('🔒 Password hashed successfully.');

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    console.log(`✨ User created successfully with ID: ${user.id}`);

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 })
  } catch (err: unknown) {
    console.error('❌ Error in /api/register:', err);

    let errorMessage = 'Unknown error occurred during user registration';
    let statusCode = 500;

    if (err instanceof PrismaClientKnownRequestError) {
      console.error(`Prisma Error Code: ${err.code}`);
      console.error(`Prisma Error Meta: ${JSON.stringify(err.meta)}`);

      if (err.code === 'P2002') {
        errorMessage = 'User with this email already exists.';
        statusCode = 409;
      } else {
        errorMessage = `Database error: ${err.message}`;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: statusCode }
    );
  }
}
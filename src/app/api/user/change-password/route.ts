import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';

export async function PUT(req: Request) {
  console.log('🔑 PUT /api/user/change-password received');

  try {
    const { userId, currentPassword, newPassword } = await req.json();

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid current password' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    console.log(`✅ Password changed for user: ${userId}`);
    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });

  } catch (error: unknown) {
    console.error('❌ Error changing password:', error);

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
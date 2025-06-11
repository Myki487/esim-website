import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function PUT(req: Request) {
  console.log('📝 PUT /api/user/profile received');

  try {
    const { userId, name, fullName, phoneNumber } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const dataToUpdate: { name?: string; fullName?: string; phoneNumber?: string } = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (fullName !== undefined) dataToUpdate.fullName = fullName;
    if (phoneNumber !== undefined) dataToUpdate.phoneNumber = phoneNumber;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    console.log(`✅ User profile updated: ${userId}`);
    return NextResponse.json({ message: 'Profile updated successfully', user: userWithoutPassword }, { status: 200 });

  } catch (error: unknown) {
    console.error('❌ Error updating user profile:', error);

    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta?.target === 'User_phoneNumber_key') {
        errorMessage = 'Phone number is already in use. Please use a different one.';
        statusCode = 409; // Conflict
      } else {
        errorMessage = `Database error: ${error.message}`;
      }
      console.error(`Prisma Error Code: ${error.code}`);
      console.error(`Prisma Error Meta: ${JSON.stringify(error.meta)}`);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage, error: errorMessage }, { status: statusCode });
  }
}
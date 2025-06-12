import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const result = await db.$transaction(async (prisma) => {
      await prisma.purchase.deleteMany({
        where: {
          userId: userId,
        },
      });

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return deletedUser;
    });

    return NextResponse.json({ message: 'Account and all associated purchases deleted successfully', user: result }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error deleting account:', error);

    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if ('code' in error && typeof error.code === 'string') {
        if (error.code === 'P2025') {
          errorMessage = 'User not found';
          statusCode = 404;
        }
      }
    } else if (typeof error === 'string') {
        errorMessage = error;
    }


    return NextResponse.json({ message: errorMessage, error: errorMessage }, { status: statusCode });
  }
}
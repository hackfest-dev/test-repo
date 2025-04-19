// app/api/borrow/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, bookId } = await request.json();

  try {
    // Check if the book is available
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book || book.stock <= 0) {
      return NextResponse.json({ error: 'Book not available' }, { status: 400 });
    }

    // Create borrow request with PENDING status
    const borrowRequest = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ message: 'Borrow request submitted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to request borrow' }, { status: 500 });
  }
}

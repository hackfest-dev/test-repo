// app/api/books/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM Book`);
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const { title, author, stock } = await request.json();

  try {
    const newBook = await prisma.$executeRawUnsafe(
      `INSERT INTO Book (title, author, stock) VALUES ('${title}', '${author}', ${stock})`
    );
    return NextResponse.json(
      { message: "Book added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add book", details: error },
      { status: 500 }
    );
  }
}

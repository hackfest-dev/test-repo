// app/api/borrow-approval/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Fetch all borrow requests that are pending
  const borrowRequests = await prisma.borrow.findMany({
    where: { status: "PENDING" },
    include: {
      user: true,
      book: true,
    },
  });
  return NextResponse.json(borrowRequests);
}

export async function POST(request: Request) {
  const { borrowId, status } = await request.json();

  if (status !== "APPROVED" && status !== "REJECTED") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    // Update the borrow status based on approval or rejection
    const updatedRequest = await prisma.borrow.update({
      where: { id: borrowId },
      data: { status },
    });

    // If approved, decrease book stock
    if (status === "APPROVED") {
      await prisma.book.update({
        where: { id: updatedRequest.bookId },
        data: { stock: { decrement: 1 } },
      });
    }

    return NextResponse.json({ message: "Request updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update borrow request" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.fakta_komoditas.findMany({
      include: {
        komoditas: true,
        lokasi: true,
        waktu: true,
      },
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching fakta_komoditas:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

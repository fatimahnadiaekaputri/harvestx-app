import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id_komoditas,
      id_lokasi,
      startDate,  // format: "2024-01-01"
      endDate     // format: "2024-12-31"
    } = body;

    const filteredData = await prisma.fakta_komoditas.findMany({
      where: {
        ...(id_komoditas && { id_komoditas }),
        ...(id_lokasi && { id_lokasi }),
        waktu: {
          ...(startDate && endDate && {
            tanggal: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            }
          }),
        },
      },
      include: {
        komoditas: true,
        lokasi: true,
        waktu: true,
      },
    });

    return NextResponse.json({ success: true, data: filteredData });
  } catch (error) {
    console.error("Error filtering fakta_komoditas:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

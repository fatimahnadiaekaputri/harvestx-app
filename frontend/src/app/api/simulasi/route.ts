import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { komoditas, hari } = body;

    if (!komoditas || !Array.isArray(komoditas) || komoditas.length === 0 || !hari || hari <= 0) {
      return NextResponse.json(
        { error: "Harap kirimkan array komoditas dan hari (>= 1)" },
        { status: 400 }
      );
    }

    const result: {
      id: number;
      komoditas: string;
      harga: number;
    }[] = [];

    for (const namaKomoditas of komoditas) {
      const data = await prisma.simulasi_prediksi.findMany({
        where: { komoditas: namaKomoditas },
        orderBy: { id: "asc" },
        skip: hari - 1,
        take: 1,
        select: {
          id: true,
          komoditas: true,
          harga_prediksi: true,
        },
      });

      if (data.length) {
        result.push({
          id: data[0].id,
          komoditas: data[0].komoditas ?? "",
          harga: Number(data[0].harga_prediksi ?? 0),
        });
      } else {
        result.push({
          id: 0,
          komoditas: namaKomoditas,
          harga: 0,
        });
      }
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

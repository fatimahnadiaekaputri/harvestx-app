import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { barang } = body;

    if (!barang?.length) {
      return NextResponse.json(
        { error: "Harap kirimkan parameter: barang (array of { id, komoditas })" },
        { status: 400 }
      );
    }

    const result: {
      id: number;
      komoditas: string;
      harga: number;
    }[] = [];

    for (const item of barang) {
      const { id, komoditas } = item;

      if (!id || !komoditas) continue;

      try {
        const data = await prisma.simulasi_prediksi.findFirst({
          where: {
            id: Number(id),
            komoditas,
          },
          select: {
            harga_prediksi: true,
          },
        });

        result.push({
          id: Number(id),
          komoditas,
          harga: Number(data?.harga_prediksi ?? 0),
        });
      } catch (err) {
        console.error(`Gagal ambil data id=${id} komoditas=${komoditas}`, err);
        result.push({
          id: Number(id),
          komoditas,
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

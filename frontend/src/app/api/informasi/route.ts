import { PrismaClient } from '@prisma/client'
import { subDays, addDays, format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

const modelMap = {
    bawang_merah: prisma.bawang_merah,
    bawang_putih: prisma.bawang_putih,
    beras: prisma.beras,
    cabai: prisma.cabai,
    kangkung: prisma.kangkung,
    kedelai: prisma.kedelai,
    kentang: prisma.kentang,
    ketimun: prisma.ketimun,
    sawi: prisma.sawi,
    tomat: prisma.tomat
} as const;

type KomoditasKey = keyof typeof modelMap

export async function GET(req: NextRequest) {
  const today = new Date()

  const komoditas: KomoditasKey[] = [
    "bawang_merah", "bawang_putih", "beras", "cabai", "kangkung",
    "kedelai", "kentang", "ketimun", "sawi", "tomat"
  ]

  const result = await Promise.all(komoditas.map(async (nama) => {
    let hargaHariIni = 0

    try {
      // Type assertion to bypass the union type issue
      const model = modelMap[nama] as any;
      const harga = await model.findFirst({
        where: {
          waktu: {
            tanggal: today
          }
        },
        orderBy: { id: 'desc' }
      })
      if (harga) hargaHariIni = Number(harga.harga)
    } catch (e) {
      hargaHariIni = 0
    }

    // Get 5 predictions ahead
    const prediksi = await prisma.simulasi_prediksi.findMany({
      where: { 
        komoditas: nama 
      },
      orderBy: { id: 'asc' },
      take: 5
    })

    let hargaTerbaik = 0
    let tanggalPrediksi = null

    if (prediksi.length > 0) {
      const denganHarga = prediksi
        .map((p, i) => ({
          harga: Number(p.harga_prediksi ?? 0),
          tanggal: addDays(today, i + 1)
        }))
        .sort((a, b) => a.harga - b.harga)

      hargaTerbaik = denganHarga[0].harga
      tanggalPrediksi = format(denganHarga[0].tanggal, 'yyyy-MM-dd')
    }

    return {
      komoditas: nama,
      hargaHariIni,
      hargaTerbaik,
      tanggalPrediksi
    }
  }))

  return NextResponse.json(result)
}
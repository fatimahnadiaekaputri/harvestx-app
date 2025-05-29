import { PrismaClient } from '@prisma/client'
import { subDays, addDays, format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server';

// Singleton Prisma Client - hanya buat satu instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

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

// Helper function untuk limit concurrent operations
async function processInBatches<T, R>(
  items: T[], 
  processor: (item: T) => Promise<R>, 
  batchSize: number = 3
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  
  return results;
}

export async function GET(req: NextRequest) {
  try {
    const today = new Date()

    const komoditas: KomoditasKey[] = [
      "bawang_merah", "bawang_putih", "beras", "cabai", "kangkung",
      "kedelai", "kentang", "ketimun", "sawi", "tomat"
    ]

    // Process komoditas in batches of 3 to limit concurrent connections
    const result = await processInBatches(komoditas, async (nama) => {
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
        console.error(`Error fetching harga for ${nama}:`, e)
        hargaHariIni = 0
      }

      // Get 5 predictions ahead
      let hargaTerbaik = 0
      let tanggalPrediksi = null

      try {
        const prediksi = await prisma.simulasi_prediksi.findMany({
          where: { 
            komoditas: nama 
          },
          orderBy: { id: 'asc' },
          take: 5
        })

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
      } catch (e) {
        console.error(`Error fetching prediksi for ${nama}:`, e)
        hargaTerbaik = hargaHariIni // fallback ke harga hari ini
      }

      return {
        komoditas: nama,
        hargaHariIni,
        hargaTerbaik,
        tanggalPrediksi
      }
    }, 3); // Process 3 commodities at a time

    return NextResponse.json(result)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
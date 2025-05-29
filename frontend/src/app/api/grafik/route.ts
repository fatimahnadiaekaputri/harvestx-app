import { PrismaClient } from '@prisma/client'
import { subMonths, addDays, format, startOfMonth, endOfMonth, isSameMonth, isSameYear } from 'date-fns'
import { id } from 'date-fns/locale'
import { NextRequest, NextResponse } from 'next/server';

// Singleton Prisma Client - hanya buat satu instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

type KomoditasKey = 
  | "bawang_merah" 
  | "bawang_putih" 
  | "beras" 
  | "cabai" 
  | "kangkung"
  | "kedelai" 
  | "kentang" 
  | "ketimun" 
  | "sawi" 
  | "tomat"

// Model mapping untuk menghindari repetitive code
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

// Helper function to get historical data for a commodity
async function getHistoricalData(komoditas: KomoditasKey, startDate: Date, endDate: Date) {
  try {
    // Type assertion to bypass the union type issue - sama seperti API informasi
    const model = modelMap[komoditas] as any;
    
    const data = await model.findMany({
      where: {
        waktu: {
          tanggal: {
            gte: startDate,
            lte: endDate
          }
        }
      },
      include: { waktu: true },
      orderBy: { waktu: { tanggal: 'asc' } }
    });
    
    return data;
  } catch (error) {
    console.error(`Error fetching historical data for ${komoditas}:`, error);
    return []; // Return empty array if error
  }
}

// Helper function to aggregate data by month
function aggregateByMonth(data: any[]) {
  const monthlyData = new Map();
  
  data.forEach(item => {
    if (!item.waktu?.tanggal) return;
    
    const date = new Date(item.waktu.tanggal);
    const monthKey = format(date, 'yyyy-MM');
    
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        prices: [],
        date: date
      });
    }
    
    monthlyData.get(monthKey).prices.push(Number(item.harga));
  });
  
  // Calculate average price for each month
  const result = Array.from(monthlyData.entries()).map(([monthKey, data]) => ({
    period: format(data.date, 'MMM yyyy', { locale: id }),
    periodKey: monthKey,
    harga: data.prices.reduce((sum: number, price: number) => sum + price, 0) / data.prices.length,
    type: 'historical' as const,
    date: data.date
  }));
  
  return result.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { komoditas } = body;
    
    if (!komoditas) {
      return NextResponse.json({ error: 'Komoditas is required' }, { status: 400 });
    }
    
    const validKomoditas: KomoditasKey[] = [
      "bawang_merah", "bawang_putih", "beras", "cabai", "kangkung",
      "kedelai", "kentang", "ketimun", "sawi", "tomat"
    ];
    
    if (!validKomoditas.includes(komoditas)) {
      return NextResponse.json({ error: 'Invalid komoditas' }, { status: 400 });
    }
    
    const today = new Date();
    const oneYearAgo = subMonths(today, 12);
    
    // Get historical data (12 months ago until today)
    const historicalData = await getHistoricalData(komoditas, oneYearAgo, today);
    
    // Aggregate by month
    const monthlyData = aggregateByMonth(historicalData);
    
    // Get predictions for next 5 days dengan error handling
    let predictionData: any[] = [];
    
    try {
      const prediksi = await prisma.simulasi_prediksi.findMany({
        where: {
          komoditas: komoditas
        },
        orderBy: { id: 'asc' },
        take: 5
      });
      
      // Format prediction data
      predictionData = prediksi.map((p, index) => {
        const futureDate = addDays(today, index + 1);
        return {
          period: format(futureDate, 'dd MMM', { locale: id }),
          periodKey: format(futureDate, 'yyyy-MM-dd'),
          harga: Number(p.harga_prediksi ?? 0),
          type: 'prediction' as const,
          date: futureDate
        };
      });
    } catch (error) {
      console.error(`Error fetching predictions for ${komoditas}:`, error);
      // Jika prediksi gagal, tetap lanjutkan dengan data historis saja
      predictionData = [];
    }
    
    // Combine historical and prediction data
    const combinedData = [...monthlyData, ...predictionData];
    
    return NextResponse.json({
      komoditas,
      data: combinedData,
      summary: {
        totalDataPoints: combinedData.length,
        historicalMonths: monthlyData.length,
        predictionDays: predictionData.length,
        dateRange: {
          from: format(oneYearAgo, 'yyyy-MM-dd'),
          to: format(addDays(today, 5), 'yyyy-MM-dd')
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: Also support GET method for testing
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const komoditas = searchParams.get('komoditas');
    
    if (!komoditas) {
      return NextResponse.json({ 
        message: 'Please use POST method with komoditas in body, or add ?komoditas=nama_komoditas for testing',
        example: '?komoditas=beras'
      });
    }
    
    // Convert GET to POST-like behavior for testing
    const mockRequest = {
      json: async () => ({ komoditas })
    };
    
    return POST(mockRequest as any);
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
import { PrismaClient } from '@prisma/client'
import { subMonths, addDays, format, startOfMonth, endOfMonth, isSameMonth, isSameYear } from 'date-fns'
import { id } from 'date-fns/locale'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

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

// Helper function to get historical data for a commodity
async function getHistoricalData(komoditas: KomoditasKey, startDate: Date, endDate: Date) {
  let data: any[] = [];
  
  // Use explicit calls to avoid union type issues
  if (komoditas === "bawang_merah") {
    data = await prisma.bawang_merah.findMany({
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
  } else if (komoditas === "bawang_putih") {
    data = await prisma.bawang_putih.findMany({
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
  } else if (komoditas === "beras") {
    data = await prisma.beras.findMany({
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
  } else if (komoditas === "cabai") {
    data = await prisma.cabai.findMany({
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
  } else if (komoditas === "kangkung") {
    data = await prisma.kangkung.findMany({
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
  } else if (komoditas === "kedelai") {
    data = await prisma.kedelai.findMany({
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
  } else if (komoditas === "kentang") {
    data = await prisma.kentang.findMany({
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
  } else if (komoditas === "ketimun") {
    data = await prisma.ketimun.findMany({
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
  } else if (komoditas === "sawi") {
    data = await prisma.sawi.findMany({
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
  } else if (komoditas === "tomat") {
    data = await prisma.tomat.findMany({
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
  }
  
  return data;
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
    
    // Get predictions for next 5 days
    const whereClause: any = {};
    whereClause.komoditas = komoditas;
    
    const prediksi = await prisma.simulasi_prediksi.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
      take: 5
    });
    
    // Format prediction data
    const predictionData = prediksi.map((p, index) => {
      const futureDate = addDays(today, index + 1);
      return {
        period: format(futureDate, 'dd MMM', { locale: id }),
        periodKey: format(futureDate, 'yyyy-MM-dd'),
        harga: Number(p.harga_prediksi ?? 0),
        type: 'prediction' as const,
        date: futureDate
      };
    });
    
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
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Optional: Also support GET method for testing
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const komoditas = searchParams.get('komoditas');
  
  if (!komoditas) {
    return NextResponse.json({ 
      message: 'Please use POST method with komoditas in body, or add ?komoditas=nama_komoditas for testing' 
    });
  }
  
  // Convert GET to POST-like behavior for testing
  const mockRequest = {
    json: async () => ({ komoditas })
  };
  
  return POST(mockRequest as any);
}
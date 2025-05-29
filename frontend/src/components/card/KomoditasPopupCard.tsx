import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { X } from "lucide-react";

interface DataPoint {
  period: string;
  periodKey: string;
  harga: number;
  type: 'historical' | 'prediction';
  date: Date;
}

interface ApiResponse {
  komoditas: string;
  data: DataPoint[];
  summary: {
    totalDataPoints: number;
    historicalMonths: number;
    predictionDays: number;
    dateRange: {
      from: string;
      to: string;
    };
  };
}

interface KomoditasPopupCardProps {
  selectedKomoditas: string;
  selectedDate: string;
  onClose: () => void;
}

const KomoditasPopupCard = ({ 
  selectedKomoditas, 
  selectedDate,
  onClose 
}: KomoditasPopupCardProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hargaHariIni, setHargaHariIni] = useState(0);
  const [hargaTertinggi, setHargaTertinggi] = useState<DataPoint | null>(null);
  const [hargaTerendah, setHargaTerendah] = useState<DataPoint | null>(null);

  useEffect(() => {
    if (!selectedKomoditas) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/grafik', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            komoditas: selectedKomoditas
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        // Set the main data
        setData(result.data);

        // Calculate statistics
        const historicalData = result.data.filter(item => item.type === 'historical');
        const predictionData = result.data.filter(item => item.type === 'prediction');

        // Set current price (last historical data point)
        if (historicalData.length > 0) {
          setHargaHariIni(historicalData[historicalData.length - 1].harga);
        }

        // Find highest and lowest from predictions
        if (predictionData.length > 0) {
          const highest = predictionData.reduce((prev, curr) =>
            prev.harga > curr.harga ? prev : curr
          );
          const lowest = predictionData.reduce((prev, curr) =>
            prev.harga < curr.harga ? prev : curr
          );
          
          setHargaTertinggi(highest);
          setHargaTerendah(lowest);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedKomoditas]);

  // Format komoditas name for display
  const formatKomoditasName = (komoditas: string) => {
    return komoditas.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-blue-600">
            {`Harga: Rp ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-sm text-gray-500">
            {data.type === 'historical' ? 'Data Historis' : 'Prediksi'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format chart data for display
  const chartData = data.map(item => ({
    ...item,
    harga: Math.round(item.harga)
  }));

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Card className="w-[90%] max-w-4xl h-[90%] relative">
          <div className="flex justify-center items-center h-full">
            <div className="text-lg">Loading...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Card className="w-[90%] max-w-4xl h-[90%] relative">
          <button onClick={onClose} className="absolute top-4 right-4 z-10">
            <X size={24} />
          </button>
          <div className="flex justify-center items-center h-full">
            <div className="text-red-500 text-lg">Error: {error}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[95%] max-w-6xl h-[95%] relative overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 hover:bg-gray-100 rounded-full p-1"
        >
          <X size={24} />
        </button>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl">
            Grafik Harga - {formatKomoditasName(selectedKomoditas)}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Data Historis 12 Bulan Terakhir & Prediksi 5 Hari Ke Depan
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto h-[calc(100%-120px)]">
          {/* Chart */}
          <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="period" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  fontSize={12}
                  tickFormatter={(value) => `Rp${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="harga" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border">
              <p className="text-sm font-medium text-gray-600 mb-1">Harga Saat Ini</p>
              <p className="text-xl font-bold text-blue-600">
                Rp {hargaHariIni.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Data terakhir tersedia
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border">
              <p className="text-sm font-medium text-gray-600 mb-1">Prediksi Terendah</p>
              <p className="text-xl font-bold text-green-600">
                Rp {hargaTerendah?.harga?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {hargaTerendah?.period || '-'}
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border">
              <p className="text-sm font-medium text-gray-600 mb-1">Prediksi Tertinggi</p>
              <p className="text-xl font-bold text-red-600">
                Rp {hargaTertinggi?.harga?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {hargaTertinggi?.period || '-'}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Data Historis & Prediksi</span>
            </div>
            <div className="text-gray-600">
              Total {data.length} data points | 
              {data.filter(d => d.type === 'historical').length} historis | 
              {data.filter(d => d.type === 'prediction').length} prediksi
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KomoditasPopupCard;
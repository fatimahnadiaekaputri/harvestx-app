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
} from "recharts";
import { X } from "lucide-react";

const KomoditasPopupCard = ({ selectedKomoditas, selectedDate, onClose }: any) => {
  const [historis, setHistoris] = useState<any[]>([]);
  const [prediksi, setPrediksi] = useState<any[]>([]);
  const [hargaHariIni, setHargaHariIni] = useState(0);
  const [hargaTertinggi, setHargaTertinggi] = useState<any>({ harga: 0, tanggal: "-" });
  const [hargaTerendah, setHargaTerendah] = useState<any>({ harga: 0, tanggal: "-" });

  useEffect(() => {
    if (!selectedKomoditas || !selectedDate) return;

    console.log("Fetching data for:", selectedKomoditas, "on date:", selectedDate);

    // Dummy data untuk testing (ini bisa diganti fetch API kalau backend sudah siap)
    const historicalData = [
      { tanggal: "2025-05-01", harga: 1000 },
      { tanggal: "2025-05-02", harga: 1050 },
      { tanggal: "2025-05-03", harga: 1020 },
      { tanggal: "2025-05-04", harga: 1100 },
      { tanggal: "2025-05-05", harga: 1080 },
    ];

    const predictedData = [
      { tanggal: "2025-05-06", harga: 1120 },
      { tanggal: "2025-05-07", harga: 1140 },
      { tanggal: "2025-05-08", harga: 1130 },
      { tanggal: "2025-05-09", harga: 1150 },
      { tanggal: "2025-05-10", harga: 1160 },
    ];

    setHistoris(historicalData);
    setPrediksi(predictedData);

    // Set harga hari ini (harga terakhir dari historical)
    setHargaHariIni(historicalData[historicalData.length - 1]?.harga || 0);

    // Cari harga tertinggi dan terendah dari prediksi
    const highest = predictedData.reduce((prev, curr) =>
      prev.harga > curr.harga ? prev : curr
    );
    const lowest = predictedData.reduce((prev, curr) =>
      prev.harga < curr.harga ? prev : curr
    );

    setHargaTertinggi(highest);
    setHargaTerendah(lowest);

  }, [selectedKomoditas, selectedDate]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-[90%] h-[90%] relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        <CardHeader>
          <CardTitle>Grafik Harga - {selectedDate} - {selectedKomoditas}</CardTitle>
          <CardDescription>5 Hari Sebelum & 5 Hari Setelah</CardDescription>
        </CardHeader>

        <CardContent>
          <LineChart width={window.innerWidth * 0.8} height={300} data={[...historis, ...prediksi]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tanggal" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="harga" stroke="#8884d8" />
          </LineChart>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold">Harga Hari Ini</p>
              <p className="text-xl">Rp {hargaHariIni.toLocaleString()}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold">Harga Terendah</p>
              <p className="text-xl">Rp {hargaTerendah?.harga?.toLocaleString() || 0}</p>
              <p className="text-sm">Tanggal: {hargaTerendah?.tanggal || '-'}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold">Harga Tertinggi</p>
              <p className="text-xl">Rp {hargaTertinggi?.harga?.toLocaleString() || 0}</p>
              <p className="text-sm">Tanggal: {hargaTertinggi?.tanggal || '-'}</p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KomoditasPopupCard;

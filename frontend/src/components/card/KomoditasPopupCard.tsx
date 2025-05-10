import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,       // <- Import base Chart from chart.js
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



// Interface untuk mendefinisikan struktur data
interface FaktaKomoditas {
  harga: number;
  waktu: {
    tanggal: string;
  };
}

interface KomoditasPopupCardProps {
  komoditas: string;
  onClose: () => void;
}

const KomoditasPopupCard = ({ komoditas, onClose }: KomoditasPopupCardProps) => {
  const [historis, setHistoris] = useState<FaktaKomoditas[]>([]);
  const [prediksi, setPrediksi] = useState<FaktaKomoditas[]>([]);
  const [hargaSekarang, setHargaSekarang] = useState<number>(0);
  const [hargaTertinggi, setHargaTertinggi] = useState<number>(0);
  const [hargaTerendah, setHargaTerendah] = useState<number>(0);

  useEffect(() => {
    fetch(`/api/fakta_komoditas/${komoditas}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const allData: FaktaKomoditas[] = json.data;
          const historicalData = allData.slice(0, 30);
          const predictedData = allData.slice(30);

          setHistoris(historicalData);
          setPrediksi(predictedData);

          setHargaSekarang(historicalData[historicalData.length - 1]?.harga || 0);
          setHargaTerendah(Math.min(...predictedData.map((d) => d.harga)));
          setHargaTertinggi(Math.max(...predictedData.map((d) => d.harga)));
        }
      });
  }, [komoditas]);

  const chartData = {
    labels: [
      ...historis.map((d) => d.waktu.tanggal),
      ...prediksi.map((d) => d.waktu.tanggal),
    ],
    datasets: [
      {
        label: "Historis",
        data: historis.map((d) => d.harga),
        borderColor: "rgba(59, 130, 246, 0.7)",
        fill: false,
      },
      {
        label: "Prediksi",
        data: prediksi.map((d) => d.harga),
        borderColor: "rgba(239, 68, 68, 0.7)",
        fill: false,
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[80%] h-[80%] rounded-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">{komoditas}</h2>

        <div className="h-[60%] mb-4">
          <Line data={chartData} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">Harga Saat Ini</p>
            <p className="text-xl">Rp {hargaSekarang.toLocaleString()}</p>
            <p className="text-sm text-right">Hari Ini</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">Harga Terendah Prediksi</p>
            <p className="text-xl">Rp {hargaTerendah.toLocaleString()}</p>
            <p className="text-sm text-right">5 Hari Ke Depan</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">Harga Tertinggi Prediksi</p>
            <p className="text-xl">Rp {hargaTertinggi.toLocaleString()}</p>
            <p className="text-sm text-right">5 Hari Ke Depan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomoditasPopupCard;

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Data harga untuk contoh
const labels = ["Jan", "Feb", "Mar", "Apr", "Mei"];
const prices = [100, 200, 150, 300, 250];

// Menentukan warna segmen (biru naik, merah turun)
const segmentColor = (ctx: any) => {
  const index = ctx.p1DataIndex;
  if (index === 0) return "blue";
  return prices[index] > prices[index - 1] ? "blue" : "red";
};

// Dataset
const data = {
  labels,
  datasets: [
    {
      data: prices, // Hapus label agar tidak muncul "undefined"
      borderColor: "gray",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0, // Garis lurus antar titik
      pointRadius: 0, // Hapus lingkaran di setiap titik
      segment: {
        borderColor: segmentColor, // Warna tiap segmen berdasarkan harga
      },
    },
  ],
};

// Opsi chart untuk menghilangkan legenda
const options = {
  plugins: {
    legend: { display: false }, // Hapus legenda bawaan Chart.js
  },
  maintainAspectRatio: false,
};

export default function Grafik() {
  return (
    <div className="my-4 p-6 pb-10 bg-white border-2 border-green-500 rounded-lg shadow-md flex gap-4">
      {/* Grafik */}
      <div className="w-3/4" style={{ width: "700px", height: "350px" }}>
        <h2 className="text-center text-lg font-bold">Harga Pangan per Bulan</h2>
        <Line data={data} options={options} />
      </div>

      {/* Legenda Kustom */}
      <div className="w-1/4 flex flex-col justify-center">
        <p className="font-semibold">Keterangan:</p>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <p>Harga Naik</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <p>Harga Turun</p>
        </div>
      </div>
    </div>
  );
}

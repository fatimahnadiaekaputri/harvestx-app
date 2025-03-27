"use client";
import { useState } from "react";

interface PriceData {
  name: string;
  price: number;
  prediction: number;
  trend: "up" | "down" | "neutral";
}

const TableInformation = () => {
  // Sample data (replace with actual API data if needed)
  const [data] = useState<PriceData[]>([
    { name: "Beras Kualitas Bawah I", price: 13800, prediction: 13900, trend: "up" },
    { name: "Beras Kualitas Bawah II", price: 13800, prediction: 13900, trend: "down" },
    { name: "Beras Kualitas Medium I", price: 13800, prediction: 13900, trend: "down" },
    { name: "Beras Kualitas Medium II", price: 13800, prediction: 13900, trend: "neutral" },
    { name: "Beras Kualitas Super I", price: 13800, prediction: 13900, trend: "up" },
    { name: "Beras Kualitas Super II", price: 13800, prediction: 13900, trend: "down" },
  ]);

  return (
    <div className="bg-[#4FAD5B] p-4 rounded-lg mt-4 overflow-x-auto">
      <table className="w-full bg-[#4FAD5B] rounded-lg overflow-hidden">
        {/* Table Header with rounded corners */}
        <thead className="bg-white text-black rounded-lg">
          <tr className="rounded-lg">
            <th className="p-4 h-16 text-left rounded-tl-lg rounded-bl-lg">Nama Komoditas</th>
            <th className="p-4 h-16 text-center">Harga*</th>
            <th className="p-4 h-16 text-center">Prediksi**</th>
            <th className="p-4 h-16 text-center rounded-tr-lg rounded-br-lg">Aksi</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index === data.length - 1 ? "rounded-b-lg" : ""}>
              <td className="p-4 h-16 text-white">{item.name}</td>
              
              {/* Harga with Trend Icon */}
              <td className="p-4 h-16 text-white text-center justify-center items-center gap-1">
                {item.trend === "up" ? "🔼" : item.trend === "down" ? "🔽" : "➖"}
                Rp{item.price.toLocaleString()}
              </td>

              {/* Prediksi Harga */}
              <td className="p-4 h-16 text-white text-center">Rp{item.prediction.toLocaleString()}</td>

              {/* Action Button */}
              <td className="p-4 h-16 text-center">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Lihat Grafik
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Table Notes */}
      <p className="text-xs text-white mt-2">
        * Harga dalam kg <br /> ** Prediksi dalam kg
      </p>
    </div>
  );
};

export default TableInformation;

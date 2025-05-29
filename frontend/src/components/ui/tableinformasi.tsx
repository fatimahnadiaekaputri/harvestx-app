"use client";
import { useEffect, useState } from "react";
import KomoditasPopupCard from "@/components/card/KomoditasPopupCard";

interface PriceData {
  komoditas_key: string; // Add this to store the backend key
  name: string;
  price: number;
  prediction: number;
  trend: "up" | "down" | "neutral";
  predictionDate?: string; // Add prediction date
}

interface TableInformationProps {
  selectedKomoditas: string | null;
  selectedDate: string | null;
}

const TableInformation = ({ selectedKomoditas, selectedDate }: TableInformationProps) => {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRowKomoditas, setSelectedRowKomoditas] = useState<string | null>(null);

  // Mapping display names to backend keys
  const komoditasMapping: { [key: string]: string } = {
    "Beras": "beras",
    "Bawang Merah": "bawang_merah", 
    "Bawang Putih": "bawang_putih",
    "Cabai": "cabai",
    "Kangkung": "kangkung",
    "Kedelai": "kedelai",
    "Kentang": "kentang",
    "Ketimun": "ketimun",
    "Sawi": "sawi",
    "Tomat": "tomat"
  };

  // Reverse mapping for backend keys to display names
  const reverseKomoditasMapping: { [key: string]: string } = {
    "beras": "Beras",
    "bawang_merah": "Bawang Merah",
    "bawang_putih": "Bawang Putih", 
    "cabai": "Cabai",
    "kangkung": "Kangkung",
    "kedelai": "Kedelai",
    "kentang": "Kentang",
    "ketimun": "Ketimun",
    "sawi": "Sawi",
    "tomat": "Tomat"
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Changed from POST to GET method
        const response = await fetch("/api/informasi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Updated to match the new API response structure
        if (Array.isArray(result)) {
          const transformed: PriceData[] = result.map((item: any) => {
            const harga = item.hargaHariIni || 0;
            const prediction = item.hargaTerbaik || harga;
            let trend: "up" | "down" | "neutral" = "neutral";

            if (prediction > harga) trend = "up";
            else if (prediction < harga) trend = "down";

            // Get display name from reverse mapping
            const displayName = reverseKomoditasMapping[item.komoditas] || item.komoditas;

            return {
              komoditas_key: item.komoditas,
              name: displayName,
              price: harga,
              prediction: prediction,
              trend: trend,
              predictionDate: item.tanggalPrediksi,
            };
          });

          setData(transformed);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to show popup for a specific row
  const handleShowPopup = (komoditas_key: string) => {
    setSelectedRowKomoditas(komoditas_key);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedRowKomoditas(null);
  };

  // Get trend indicator
  const getTrendIndicator = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <span className="text-green-300">↗️</span>;
      case "down":
        return <span className="text-red-300">↘️</span>;
      default:
        return <span className="text-gray-300">→</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#4FAD5B] p-4 rounded-lg mt-4">
        <div className="flex justify-center items-center h-32">
          <div className="text-white text-lg">Loading data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#4FAD5B] p-4 rounded-lg mt-4">
        <div className="flex justify-center items-center h-32">
          <div className="text-red-200 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#4FAD5B] p-4 rounded-lg mt-4 overflow-x-auto">
      <table className="w-full bg-[#4FAD5B] rounded-lg overflow-hidden mt-4">
        <thead className="bg-white text-black rounded-lg">
          <tr className="rounded-lg">
            <th className="p-4 h-16 text-left rounded-tl-lg rounded-bl-lg">Nama Komoditas</th>
            <th className="p-4 h-16 text-center">Harga Saat Ini*</th>
            <th className="p-4 h-16 text-center">Prediksi Harga Terbaik**</th>
            <th className="p-4 h-16 text-center">Trend</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 h-16 text-white text-center">
                Tidak ada data tersedia
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className={index === data.length - 1 ? "rounded-b-lg" : ""}>
                <td className="p-4 h-16 text-white font-medium">{item.name}</td>
                <td className="p-4 h-16 text-white text-center">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="p-4 h-16 text-white text-center">
                  Rp {item.prediction.toLocaleString()}
                </td>
                <td className="p-4 h-16 text-center">
                  {getTrendIndicator(item.trend)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pop-up Card */}
      {showPopup && selectedRowKomoditas && (
        <KomoditasPopupCard
          selectedKomoditas={selectedRowKomoditas}
          selectedDate={new Date().toISOString().slice(0, 10)}
          onClose={handleClosePopup}
        />
      )}

      <div className="mt-4 space-y-1">
        <p className="text-xs text-white">
          * Harga dalam kg <br /> 
          ** Prediksi dalam kg
        </p>
        <p className="text-xs text-gray-200">
          Total: {data.length} komoditas | 
          Naik: {data.filter(d => d.trend === 'up').length} | 
          Turun: {data.filter(d => d.trend === 'down').length} | 
          Stabil: {data.filter(d => d.trend === 'neutral').length}
        </p>
      </div>
    </div>
  );
};

export default TableInformation;
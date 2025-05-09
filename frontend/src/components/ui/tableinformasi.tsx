"use client";
import { useEffect, useState } from "react";
import KomoditasPopupCard from "@/components/card/KomoditasPopupCard";

interface PriceData {
  name: string;
  price: number;
  prediction: number;
  trend: "up" | "down" | "neutral";
}

const TableInformation = () => {
  const [data, setData] = useState<PriceData[]>([]);
  const [selectedKomoditas, setSelectedKomoditas] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/fakta_komoditas"); // GET
        const json = await res.json();

        if (json.success) {
          const transformed: PriceData[] = json.data.map((item: any) => {
            const harga = parseInt(item.harga);
            const prediction = item.harga_forcast ? parseInt(item.harga_forcast) : harga; // fallback
            let trend: "up" | "down" | "neutral" = "neutral";

            if (prediction > harga) trend = "up";
            else if (prediction < harga) trend = "down";

            return {
              name: item.komoditas.nama_komoditas,
              price: harga,
              prediction: prediction,
              trend: trend,
            };
          });

          setData(transformed);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menampilkan popup dan mengirim nama komoditas
  const handleShowPopup = (komoditas: string) => {
    setSelectedKomoditas(komoditas);
    setShowPopup(true);
  };

  // Fungsi untuk menutup popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedKomoditas(null);
  };

  return (
    <div className="bg-[#4FAD5B] p-4 rounded-lg mt-4 overflow-x-auto">
      <table className="w-full bg-[#4FAD5B] rounded-lg overflow-hidden">
        <thead className="bg-white text-black rounded-lg">
          <tr className="rounded-lg">
            <th className="p-4 h-16 text-left rounded-tl-lg rounded-bl-lg">Nama Komoditas</th>
            <th className="p-4 h-16 text-center">Harga Saat Ini*</th>
            <th className="p-4 h-16 text-center">Prediksi Harga Terbaik**</th>
            <th className="p-4 h-16 text-center rounded-tr-lg rounded-br-lg">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index === data.length - 1 ? "rounded-b-lg" : ""}>
              <td className="p-4 h-16 text-white">{item.name}</td>
              
              <td className="p-4 h-16 text-white text-center justify-center items-center gap-1">
                {item.trend === "up" ? "🔼" : item.trend === "down" ? "🔽" : "➖"}
                Rp{item.price.toLocaleString()}
              </td>

              <td className="p-4 h-16 text-white text-center">Rp{item.prediction.toLocaleString()}</td>

              <td className="p-4 h-16 text-center">
                <button
                  onClick={() => handleShowPopup(item.name)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  Lihat Grafik
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-white mt-2">
        * Harga dalam kg <br /> ** Prediksi dalam kg
      </p>

      {/* Pop-up Card */}
      {showPopup && selectedKomoditas && (
        <KomoditasPopupCard 
          komoditas={selectedKomoditas} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

export default TableInformation;

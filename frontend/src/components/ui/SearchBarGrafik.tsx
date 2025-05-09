"use client";
import { useState } from "react";
import SearchBox from "@/components/ui/SearchBox";
import InputKomoditasGrafik from "./inputKomoditasGrafik";
import RegionSelector from "@/components/ui/inputWilayah";
import MarketTypeSelector from "@/components/ui/inputPasar";
import InputTanggalDari from "@/components/ui/inputTanggalDari";
import InputTanggalSampai from "@/components/ui/inputTanggalSampai";

const SearchBarGrafik = () => {
  const [search, setSearch] = useState("");
  const [commodity, setCommodity] = useState("Beras");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [region, setRegion] = useState("Kota Yogyakarta");
  const [marketType, setMarketType] = useState("Pasar Tradisional");

  return (
    <div className="bg-[#4FAD5B] rounded-lg p-6 shadow-lg max-w-[1000px] mx-auto">
      {/* Wrapper untuk isi */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* SearchBox */}
        <div className="md:w-1/2">
          <InputKomoditasGrafik commodity={commodity} setCommodity={setCommodity} />
        </div>

        {/* Input */}
        <div className="px-6 md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputTanggalDari date={startDate} setDate={setStartDate} />
        <InputTanggalSampai date={endDate} setDate={setEndDate} />
        <RegionSelector region={region} setRegion={setRegion} />
        <MarketTypeSelector marketType={marketType} setMarketType={setMarketType} />
        </div>
      </div>

      {/* Button */}
      <div className="px-6 flex justify-end mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          Lihat Grafik
        </button>
      </div>
    </div>
  );
};

export default SearchBarGrafik;

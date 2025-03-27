"use client";
import { useState } from "react";
import SearchBox from "@/components/ui/SearchBox";
import InputTanggalRange from "@/components/ui/inputTanggalRange";
import CommoditySelector from "@/components/ui/inputKomoditas";
import RegionSelector from "@/components/ui/inputWilayah";
import MarketTypeSelector from "@/components/ui/inputPasar";

const SearchBarGrafik = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [commodity, setCommodity] = useState("Beras");
  const [region, setRegion] = useState("Kota Yogyakarta");
  const [marketType, setMarketType] = useState("Pasar Tradisional");

  return (
    <div className="h-[220px] bg-[#4FAD5B] rounded-lg flex p-6 shadow-lg">
      
      <SearchBox search={search} setSearch={setSearch} />

      {/* Other Inputs */}
      <div className="w-1/2 grid grid-cols-2 gap-4">
        {/* Baris 1 - Input Tanggal */}
        <div className="col-span-2">
          <InputTanggalRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>

        {/* Baris 2 - Komoditas & Wilayah */}
        <CommoditySelector commodity={commodity} setCommodity={setCommodity} />
        <RegionSelector region={region} setRegion={setRegion} />

        {/* Baris 3 - Jenis Pasar & Tombol */}
        <MarketTypeSelector marketType={marketType} setMarketType={setMarketType} />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          Lihat Grafik
        </button>
      </div>
    </div>
  );
};

export default SearchBarGrafik;

"use client";
import { useState } from "react";
import SearchBox from "@/components/ui/SearchBox";
import DatePicker from "@/components/ui/inputTanggal";
import RegionSelector from "@/components/ui/inputWilayah";
import CommoditySelector from "@/components/ui/inputKomoditas";
import MarketTypeSelector from "@/components/ui/inputPasar";

const SearchBarInformasi = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [region, setRegion] = useState("Kota Yogyakarta");
  const [commodity, setCommodity] = useState("Beras");
  const [marketType, setMarketType] = useState("Pasar Tradisional");

  

  return (
    <div className="h-[150px] bg-[#4FAD5B] rounded-lg flex p-6 shadow-lg">
      {/* Search Box */}
      <SearchBox search={search} setSearch={setSearch} />

      {/* Other Inputs */}
      <div className="w-1/2 grid grid-cols-2 gap-4">
        <DatePicker date={date} setDate={setDate} />
        <CommoditySelector commodity={commodity} setCommodity={setCommodity} />
        <RegionSelector region={region} setRegion={setRegion} />
        <MarketTypeSelector marketType={marketType} setMarketType={setMarketType} />
      </div>
    </div>
  );
};

export default SearchBarInformasi;

"use client";
import { useState } from "react";
import SearchBox from "@/components/ui/SearchBox";
import DatePicker from "@/components/ui/inputTanggal";
import RegionSelector from "@/components/ui/inputWilayah";
import CommoditySelector from "@/components/ui/inputKomoditas";
import MarketTypeSelector from "@/components/ui/inputPasar";

interface SearchBarInformasiProps {
  onSearch: (commodity: string, date: string) => void;
}

const SearchBarInformasi = ({ onSearch }: SearchBarInformasiProps) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [region, setRegion] = useState("Kota Yogyakarta");
  const [commodity, setCommodity] = useState("Beras");
  const [marketType, setMarketType] = useState("Pasar Tradisional");

  const handleSearch = () => {
    // Kirim data komoditas dan tanggal ke parent
    onSearch(commodity, date);
  };

  return (
    <div className="bg-[#4FAD5B] rounded-lg p-6 shadow-lg max-w-[1000px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="md:w-1/2">
          <SearchBox search={search} setSearch={setSearch} />
        </div>

        <div className="px-6 md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker date={date} setDate={setDate} />
          <CommoditySelector commodity={commodity} setCommodity={setCommodity} />
          <RegionSelector region={region} setRegion={setRegion} />
          <MarketTypeSelector marketType={marketType} setMarketType={setMarketType} />
        </div>
      </div>

      <div className="px-6 flex justify-end mt-4">
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
        >
          Lihat Grafik
        </button>
      </div>
    </div>
  );
};

export default SearchBarInformasi;

"use client";
import { useState } from "react";

const FilterBar = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [region, setRegion] = useState("Kota Yogyakarta");
  const [commodity, setCommodity] = useState("Beras");
  const [marketType, setMarketType] = useState("Pasar Tradisional");

  return (
    <div className="h-[200px] bg-[#4FAD5B] rounded-lg flex p-6 shadow-lg">
      {/* Search Box */}
      <div className="w-1/2 flex flex-col justify-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Cari Komoditas Disini</h2>
        <input
          type="text"
          placeholder="Cari komoditas..."
          className="p-2 text-black rounded-md border border-gray-300 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-1/2 grid grid-cols-2 gap-4 p-6">
      {/* Date Picker */}
      <input
        type="date"
        className="p-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Region Selector */}
      <select
        className="p-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="Kota Yogyakarta">Kota Yogyakarta</option>
        <option value="Sleman">Sleman</option>
        <option value="Bantul">Bantul</option>
      </select>

      {/* Commodity Selector */}
      <select
        className="p-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        value={commodity}
        onChange={(e) => setCommodity(e.target.value)}
      >
        <option value="Beras">Beras</option>
        <option value="Gula">Gula</option>
        <option value="Minyak">Minyak</option>
      </select>

      {/* Market Type Selector */}
      <select
        className="p-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        value={marketType}
        onChange={(e) => setMarketType(e.target.value)}
      >
        <option value="Pasar Tradisional">Pasar Tradisional</option>
        <option value="Supermarket">Supermarket</option>
      </select>
      </div>    
    </div>
  );
};

export default FilterBar;

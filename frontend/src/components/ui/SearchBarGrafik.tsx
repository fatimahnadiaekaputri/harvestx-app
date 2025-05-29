"use client";
import { useState } from "react";
import InputKomoditasGrafik from "./inputKomoditasGrafik";
import KomoditasPopupCard from "../card/KomoditasPopupCard";

const SearchBarGrafik = () => {
  const [commodity, setCommodity] = useState("beras");
  const [showPopup, setShowPopup] = useState(false);

  const handleLihatGrafik = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <>
      <div className="bg-[#4FAD5B] rounded-lg p-6 shadow-lg max-w-[1000px] mx-auto">
        {/* Wrapper untuk isi */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Komoditas Selector */}
          <div className="flex-1">
            <InputKomoditasGrafik commodity={commodity} setCommodity={setCommodity} />
          </div>

          {/* Button */}
          <div className="px-6 flex justify-end mt-4">
            <button 
              onClick={handleLihatGrafik}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
              Lihat Grafik
            </button>
          </div>
        </div>
      </div>

      {/* Popup Card */}
        {showPopup && (
          <KomoditasPopupCard
            selectedKomoditas={commodity}
            selectedDate={new Date().toISOString().slice(0, 10)}
            onClose={handleClosePopup}
          />
        )}
    </>
  );
};

export default SearchBarGrafik;

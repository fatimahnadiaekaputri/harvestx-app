"use client";

import { useState } from "react";
import TableInformation from "@/components/ui/tableinformasi";
import SearchBarInformasi from "@/components/ui/SearchBarPangan";

export default function InformasiPage() {
  const [selectedKomoditas, setSelectedKomoditas] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleSearch = (commodity: string, date: string) => {
    setSelectedKomoditas(commodity);
    setSelectedDate(date);
  };

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-center text-2xl font-bold">Informasi Harga Pangan</h1>

      <div className="mt-4">
        <TableInformation 
          selectedKomoditas={selectedKomoditas}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

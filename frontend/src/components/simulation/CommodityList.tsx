"use client";

import { useEffect, useState } from "react";
import { fetchAndMapKomoditas } from "../commodity/mapIconCommodity";
import CommodityCard from "./CommodityCard";
import { Commodity } from "../commodity/commodity";

interface CommodityListProps {
  onChange: (selected: Commodity[]) => void;
  setIsLoading: (value: boolean) => void;
}

export default function CommodityList({ onChange, setIsLoading }: CommodityListProps) {
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAndMapKomoditas();
        setCommodities(data);
      } catch (error) {
        alert("Gagal memuat data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selected = commodities
      .filter((c) => quantities[c.id_komoditas] > 0)
      .map((c) => ({
        ...c,
        quantity: quantities[c.id_komoditas],
        total: 0,
      }));

    onChange(selected);
  }, [quantities, commodities]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const selectedText = commodities
    .filter((c) => quantities[c.id_komoditas] > 0)
    .map((c) => c.nama_komoditas)
    .join(", ");

  return (
    <div className="bg-[#3A7D44] p-8 rounded-lg">
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <div className="grid lg:grid-cols-2 gap-4">
          {commodities.map((commodity, index) => (
            <CommodityCard key={index} commodity={commodity} onQuantityChange={handleQuantityChange} />
          ))}
        </div>
      </div>
      <div className="text-left pt-5 text-white md:text-lg text-sm">
        {selectedText ? `Dipilih: ${selectedText}` : "Belum ada komoditas yang dipilih"}
      </div>
      <div className="font-light italic justify-end text-right pt-5 text-white md:text-lg text-xs">
        *dalam kg
      </div>
    </div>
  );
}

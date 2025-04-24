"use client";

import { useEffect, useState } from "react";
import { fetchAndMapKomoditas } from "../commodity/mapIconCommodity";
import CommodityCard from "./CommodityCard";

export default function CommodityList() {
    const [commodities, setCommodities] = useState([]);
    const [selectedCommodities, setSelectedComodities] = useState<{[key:string]: number}>({});

    useEffect(() => {
        fetchAndMapKomoditas().then(setCommodities);
    }, []);

    const handleQuantityChange = (name: string, quantity: number) => {
        setSelectedComodities((prev) => {
            const updated = {...prev};
            if (quantity > 0) {
                updated[name] = quantity;
            } else {
                delete updated[name];
            }
            return updated;
        });
    };

    const selectedText = Object.keys(selectedCommodities).join(", ");

    return (
        <div className="bg-green-500 p-8 rounded-lg">
            <div className="max-h-[400px] overflow-y-auto pr-2">
                <div className="grid lg:grid-cols-2 gap-4">
                    {commodities.map((commodity, index) => (
                        <CommodityCard key={index} commodity={commodity} onQuantityChange={handleQuantityChange} />
                    ))}
                </div>
            </div>
            <div className="text-left pt-5 text-white text-lg">
                {selectedText ? `Dipilih: ${selectedText}` : "Belum ada komoditas yang dipilih"}
           </div>
           <div className="font-light italic justify-end text-right pt-5 text-white">
                *dalam kg
           </div>       
        </div>
    );
}

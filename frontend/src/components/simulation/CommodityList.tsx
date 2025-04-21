"use client";

import { useEffect, useState } from "react";
import { fetchAndMapKomoditas } from "../commodity/mapIconCommodity";
import CommodityCard from "./CommodityCard";

export default function CommodityList() {
    const [commodities, setCommodities] = useState([]);

    useEffect(() => {
        fetchAndMapKomoditas().then(setCommodities);
    }, []);

    return (
        <div className="bg-green-500 p-8 rounded-lg">
            <div className="max-h-[400px] overflow-y-auto pr-2">
                <div className="grid lg:grid-cols-2 gap-4">
                    {commodities.map((commodity, index) => (
                        <CommodityCard key={index} commodity={commodity} />
                    ))}
                </div>
            </div>
            <div className="text-left pt-5 text-white text-lg">
                Dipilih: Beras Kualitas Bawah I, Cabai Merah Besar
           </div>
           <div className="font-light italic justify-end text-right pt-5 text-white">
                *dalam kg
           </div>       
        </div>
    );
}

"use client"
import CommodityList from "@/components/simulation/CommodityList";
import TableSimulation from "@/components/simulation/tableSimulasi";
import Button from "@/components/ui/CustomButton";
import InputPasar from "@/components/ui/inputPasar";
import InputTanggal from "@/components/ui/inputTanggal";
import InputWilayah from "@/components/ui/inputWilayah";
import TableInformation from "@/components/ui/tableinformasi";
import { useState } from "react";

export default function Simulation() {
    const [selectedDate, setSelectedDate] = useState("");
    const[selectedRegion, setSelectedRegion] = useState("");
    const[selectedMarketType, setSelectedMarketType] = useState("");

    return (
        <div className="min-h-screen bg-white">
            <div className="flex text-center font-semibold text-5xl text-black justify-center mt-10">
                Simulasi Anggaran Belanja
            </div>
            <div className="mt-10 mx-20">
                <div className="text-2xl text-black font-medium mb-5">
                    Pilih Komoditas
                </div>
                <CommodityList />
                <div className="mt-10 text-2xl text-black font-medium">
                Pilih Waktu, Wilayah, dan Jenis Pasar
                </div>
                <div className="flex flex-row gap-5 mt-5">
                    <div className="w-[250px]">
                        <InputTanggal date={selectedDate} setDate={setSelectedDate} />
                    </div>
                    <div className="w-[250px]">
                        <InputWilayah region={selectedRegion} setRegion={setSelectedRegion} />
                    </div>
                    <div className="w-[250px]">
                        <InputPasar marketType={selectedMarketType} setMarketType={setSelectedMarketType} />
                    </div>
                </div>
                <div className="flex mt-10 justify-end">
                        <Button text="Coba Simulasi" className="w-60 h-15 items-center justify-center text-2xl font-semibold"/>
                </div>
            </div>
            <div className="pt-10 mx-10 pb-10">
            <TableSimulation />
            </div>
        </div>

        
    )
}
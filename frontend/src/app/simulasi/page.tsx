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
            <div className="flex text-center font-semibold lg:text-4xl md:text-3xl text-2xl text-black justify-center mt-10">
                Simulasi Anggaran Belanja
            </div>
            <div className="mt-10 lg:mx-20 mx-8">
                <div className="lg:text-2xl md:text-xl text-lg text-black font-medium mb-5">
                    Pilih Komoditas
                </div>
                <CommodityList />
                <div className="mt-10 text-2xl text-black font-medium">
                Pilih Waktu, Wilayah, dan Jenis Pasar
                </div>
                <div className="flex lg:flex-row flex-col gap-5 mt-5">
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
            <div className="pt-10 lg:mx-20 mx-8 pb-10">
                <div className="text-black font-medium text-2xl mb-5">
                    Rincian Hasil Simulasi Anggaran Belanja
                </div>
                <TableSimulation />
            </div>
        </div>

        
    )
}
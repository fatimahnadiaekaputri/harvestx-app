"use client"
import { Commodity } from "@/components/commodity/commodity";
import CommodityList from "@/components/simulation/CommodityList";
import TableSimulation from "@/components/simulation/tableSimulasi";
import Button from "@/components/ui/CustomButton";
import InputPasar from "@/components/ui/inputPasar";
import InputTanggal from "@/components/ui/inputTanggal";
import InputWilayah from "@/components/ui/inputWilayah";
import { useState } from "react";

export default function Simulation() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedMarketType, setSelectedMarketType] = useState("");
    const [selectedCommodities, setSelectedComodities] = useState<Commodity[]>([]);
    const [updatedCommodities, setUpdatedCommodities] = useState<Commodity[]>([]);

    const handleSubmit = async () => {
        const commoditiesData = selectedCommodities.map((commodity) => ({
            id_komoditas: commodity.id_komoditas,
            quantity: commodity.quantity,
            total: commodity.price * commodity.quantity,

        }))

        if (commoditiesData.length === 0 || !selectedDate || !selectedRegion || !selectedMarketType) {
            alert("Lengkapi semua input!");
            return;
        }
        const id_komoditas = selectedCommodities.map((c) => c.id_komoditas);

        try {
            const response = await fetch("/api/simulasi", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id_komoditas,
                    id_waktu: parseInt(selectedDate.split("-").join(""), 10),
                    kota: selectedRegion,
                    jenis_pasar: selectedMarketType,
                }),
            });

            const data = await response.json();
            console.log("Hasil respons: ", data);

            const updatedCommodities = selectedCommodities.map((commodity) => {
                const match = data.find(
                    (item: any) => item.nama_komoditas === commodity.nama_komoditas
                );
                const price = match ? parseFloat(match.harga) : 0;
                return {
                    ...commodity,
                    price: price,
                    total: price * commodity.quantity,
                };
            });
            setUpdatedCommodities(updatedCommodities);
            console.log(updatedCommodities);
        } catch (err) {
            console.error(err);
            alert("Gagal ambil data");
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex text-center font-semibold lg:text-4xl md:text-3xl text-2xl text-black justify-center mt-10">
                Simulasi Anggaran Belanja
            </div>
            <div className="mt-10 lg:mx-20 mx-8">
                <div className="lg:text-2xl md:text-xl text-lg text-black font-medium mb-5">
                    Pilih Komoditas
                </div>
                <CommodityList onChange={setSelectedComodities}/>
                <div className="mt-10 lg:text-2xl md:text-xl text-lg text-black font-medium">
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
                        <Button text="Coba Simulasi" className="md:w-60 md:h-15 w-40 h-10 items-center justify-center md:text-2xl text-lg font-semibold" onClick={handleSubmit}/>
                </div>
            </div>
            <div className="pt-10 lg:mx-20 mx-8 pb-10">
                <div className="text-black font-medium lg:text-2xl md:text-xl text-l mb-5">
                    Rincian Hasil Simulasi Anggaran Belanja
                </div>
                <TableSimulation data={updatedCommodities} />
            </div>
        </div>

        
    )
}
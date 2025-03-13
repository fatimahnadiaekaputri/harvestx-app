import FiturCardList from "@/components/card/FiturCardList"
import Button from "@/components/ui/CustomButton"
import Image from "next/image"
import { GiWheat } from "react-icons/gi";

export default function Hero() {
    return (
        <div className="w-full">
            <section className="bg-white min-h-screen px-10 md:px-20 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col md:items-start items-center">
                       <div className="self-start pl-8 md:pl-0">
                         <Image src="/ornament/icon_daun.png" alt="icon daun" width={60} height={60}></Image>
                       </div>
                       <div className="justify-center h-16 md:mx-10 mx-2">
                         <Image src="/ornament/komoditas.png" alt="ilustrasi komoditas" width={400} height={400}></Image>
                       </div>
                    </div>
                    <div className="pt-[280px] md:pt-10 md:mr-10 mx-auto">
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <Image src="/ornament/daun_hijau.png" alt="icon daun hijau" width={70} height={70}></Image>
                            <div className="text-black font-black text-5xl sm:text-6xl">
                                HarvestX
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end pt-10">
                            <p className="text-black text-lg sm:text-xl text-center md:text-end max-w-[500px]">
                            Menyediakan informasi dan prediksi harga pangan yang dapat kamu pantau setiap harinya. 
                            Lakukan simulasi anggaran belanja untuk membantu dalam perancangan kebutuhan harian maupun bulanamu!
                            </p>
                            <div className="pt-10 pb-20 md:pb-0">
                                <Button text="Coba Simulasi"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[#4FAD5B] min-h-screen relative overflow-hidden">
                <div className="flex flex-col justify-center items-center pt-20 mx-auto">
                    <text className="text-white text-4xl font-semibold text-center">
                        Fitur Kami
                    </text>
                    <div className="pt-30 pb-50">
                        <FiturCardList />
                    </div>
                </div>
                
                {/* Persegi Kanan Atas */}
                <div className="absolute top-20 right-0 w-20 sm:w-50 md:w-80 h-10 bg-white rounded-l-lg"></div>
                    <GiWheat size={50} className="absolute top-40 right-20 text-white"/>

                {/* Persegi Kiri Bawah */}
                <div className="absolute bottom-10 left-0 w-20 sm:w-50 md:w-80 h-10 bg-white rounded-r-lg"></div>
                <Image src="/ornament/icon_daun_putih.png" alt="Ornament Kiri Bawah" width={50} height={50} className="absolute bottom-30 left-20"/>
            </section>
        </div>
    )
}
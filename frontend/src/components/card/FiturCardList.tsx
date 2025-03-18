"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import FiturCard from "./FiturCard"

interface Fitur {
  _id: string
  logo: string
  icon: string
  title: string
  description: string
  route: string
}

export default function FiturCardList() {
  const dataFitur: Fitur[] = [
    {
      _id: "1",
      logo: "/features/informasi_harga.png",
      icon: "MdInfo",
      title: "Informasi Harga",
      description: "Prediksi dan informasi harga pangan berbasis AI",
      route: "",
    },
    {
      _id: "2",
      logo: "/features/visualisasi_grafik.png",
      icon: "TbGraphFilled",
      title: "Visualisasi Grafik",
      description: "Grafik interaktif untuk tampilan data yang informatif",
      route: "",
    },
    {
      _id: "3",
      logo: "/features/simulasi_belanja.png",
      icon: "RiShoppingBag4Fill",
      title: "Simulasi Belanja",
      description: "Perkirakan belanja dengan harga prediksi",
      route: "",
    },
  ]

  return (
    <div className="w-full">
      {/* Tampilan Grid untuk Desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {dataFitur.map((fitur) => (
          <FiturCard key={fitur._id} fitur={fitur} />
        ))}
      </div>

      {/* Tampilan Carousel untuk Mobile */}
      <div className="lg:hidden flex justify-center items-center relative w-full overflow-hidden">
      <Carousel 
  className="w-full max-w-sm md:max-w-md"
  opts={{ align: "center", containScroll: "keepSnaps", loop: false }}
>
  <CarouselContent>
    {dataFitur.map((fitur) => (
      <CarouselItem key={fitur._id} className="basis-full flex justify-center">
        <FiturCard fitur={fitur} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 z-10" />
  <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 z-10" />
</Carousel>

      </div>
    </div>
  )
}

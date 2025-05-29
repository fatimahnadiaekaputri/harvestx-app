import SearchBarGrafik from "@/components/ui/SearchBarGrafik";

export default function InformasiPage() {
  return (
    <div className="flex flex-col justify-center items-center p-6 pt-20">
      <div className="w-full max-w-[1000px]">
        <h1 className="text-center text-2xl font-bold">Grafik Harga Pangan</h1>
        <div className="mt-4 flex justify-center">
          <SearchBarGrafik />
        </div>
      </div>
    </div>
  );
}

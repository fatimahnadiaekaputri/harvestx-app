import SearchBarGrafik from "@/components/ui/SearchBarGrafik";

export default function InformasiPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-center text-2xl font-bold">Grafik Harga Pangan</h1>
      <div className="mt-4">
        <SearchBarGrafik />
      </div>
    </div>
  );
}
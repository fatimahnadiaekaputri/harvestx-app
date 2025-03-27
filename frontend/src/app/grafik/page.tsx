import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import SearchBarGrafik from "@/components/ui/SearchBarGrafik";
import Grafik from "@/components/ui/Grafik";

export default function InformasiPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-center text-2xl font-bold">Grafik Harga Pangan</h1>
      <div className="mt-4">
        <SearchBarGrafik />
        <Grafik />
      </div>
    </div>
  );
}
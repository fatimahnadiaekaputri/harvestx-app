import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import TableInformation from "@/components/ui/tableinformasi";
import SearchBarInformasi from "@/components/ui/SearchBarPangan";

export default function InformasiPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-center text-2xl font-bold">Informasi Harga Pangan</h1>
      <div className="mt-4">
        <SearchBarInformasi />
      </div>
      <div className="mt-4">
        <TableInformation />
      </div>
    </div>
  );
}

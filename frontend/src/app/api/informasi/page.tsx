import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import FilterBar from "@/components/ui/SearchBarPangan";
import TableInformation from "@/components/ui/tableinformasi";

export default function InformasiPage() {
  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold">Informasi Harga Pangan</h1>
      <div className="mt-4">
        <FilterBar />
      </div>
      <div className="mt-4">
        <TableInformation />
      </div>
    </div>
  );
}

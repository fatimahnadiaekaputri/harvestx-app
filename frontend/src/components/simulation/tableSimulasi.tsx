import { Commodity } from "../commodity/commodity";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";


export default function TableSimulation () {
    const data: Commodity[] = [
        {id_komoditas: 1, nama_komoditas: "Beras Kualitas Bawah I", price: 13800, icon: "🌾", quantity: 1, total: 13800, trend: "up"},
        {id_komoditas: 2, nama_komoditas: "Cabai Merah Besar", price: 53800, icon: "🌶️", quantity: 1, total: 53800, trend: "down" }
    ]

    const totalBelanja: number = data.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="bg-[#4FAD5B] p-4 rounded-lg text-white">
            <Table className="text-white">
                <TableHeader>
                    <TableRow className="border-none">
                        <TableHead className="md:p-4 p-2 font-bold text-black lg:text-2xl md:text-xl text-lg bg-white rounded-l-lg">Nama Komoditas</TableHead>
                        <TableHead className="md:p-4 p-2 font-bold text-black lg:text-2xl md:text-xl text-lg bg-white">Harga*</TableHead>
                        <TableHead className="md:p-4 p-2 font-bold text-black lg:text-2xl md:text-xl text-lg bg-white">Jumlah</TableHead>
                        <TableHead className="md:p-4 p-2 font-bold text-black lg:text-2xl md:text-xl text-lg bg-white rounded-r-lg">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} className="md:text-lg text-sm border-none">
                            <TableCell className="p-4">
                                {item.icon} {item.nama_komoditas}
                            </TableCell>
                            <TableCell className="p-4">
                                {item.trend === "up" ? "🔼" : "🔽"} Rp{item.price.toLocaleString()}
                            </TableCell>
                            <TableCell className="p-4">{item.quantity}</TableCell>
                            <TableCell className="p-4">Rp{item.total.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className="border-none">
                    <TableRow>
                        <TableCell colSpan={3} className="md:p-4 font-bold text-lg bg-[#4FAD5B]">Total Belanja</TableCell>
                        <TableCell className="md:p-4 p-2 bg-white text-black font-bold md:text-xl text-lg rounded-lg text-center">
                            Rp{totalBelanja.toLocaleString()}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
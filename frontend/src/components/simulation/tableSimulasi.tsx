import { Commodity } from "../commodity/commodity";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";


export default function TableSimulation () {
    const data: Commodity[] = [
        {name: "Beras Kualitas Bawah I", price: 13800, icon: "🌾", quantity: 1, total: 13800, trend: "up"},
        {name: "Cabai Merah Besar", price: 53800, icon: "🌶️", quantity: 1, total: 53800, trend: "down" }
    ]

    const totalBelanja: number = data.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="bg-[#4FAD5B] p-4 rounded-lg text-white">
            <Table className="text-white">
                <TableHeader>
                    <TableRow>
                        <TableHead className="p-4 font-bold text-black bg-white rounded-l-lg">Nama Komoditas</TableHead>
                        <TableHead className="p-4 font-bold text-black bg-white">Harga*</TableHead>
                        <TableHead className="p-4 font-bold text-black bg-white">Jumlah</TableHead>
                        <TableHead className="p-4 font-bold text-black bg-white rounded-r-lg">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="p-4">
                                {item.icon} {item.name}
                            </TableCell>
                            <TableCell className="p-4">
                                {item.trend === "up" ? "🔼" : "🔽"} Rp{item.price.toLocaleString()}
                            </TableCell>
                            <TableCell className="p-4">{item.quantity}</TableCell>
                            <TableCell className="p-4">Rp{item.total.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="p-4 font-bold text-lg">Total Belanja</TableCell>
                        <TableCell className="p-4 bg-white text-black font-bold text-lg rounded-r-lg">
                            Rp{totalBelanja.toLocaleString()}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
export interface Commodity {
    id_komoditas: number;
    nama_komoditas: string;
    icon: string;
    price: number;
    quantity: number;
    total: number;
    trend: "up" | "down";
}
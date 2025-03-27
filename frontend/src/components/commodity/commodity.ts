export interface Commodity {
    name: string;
    icon: string;
    price: number;
    quantity: number;
    total: number;
    trend: "up" | "down";
}
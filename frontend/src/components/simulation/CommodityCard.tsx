import { useState } from "react";
import { Commodity } from "../commodity/commodity";
import CounterButton from "../ui/CounterButton";

interface CommodityCardProps {
    commodity: Commodity;
    onQuantityChange: (id: number, quantity: number) => void;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ commodity, onQuantityChange }) => {
  const [count, setCount] = useState(0);

  const handleChange = (newCount: number) => {
    setCount(newCount);
    onQuantityChange(commodity.id_komoditas, newCount);
  }
    return (
      <div className="flex items-center justify-right md:gap-10 gap-2 border-2 border-black rounded-lg p-4 bg-white shadow-md w-[10vh]] h-[10vh] lg:px-10 px-5">
        <CounterButton count={count} onChange={handleChange} />
        <div className="flex items-center gap-1">
          <span className="lg:text-2xl md:text-xl text-lg">{commodity.icon}</span>
          <span className="lg:text-2xl md:text-xl text-lg font-semibold">{commodity.nama_komoditas}</span>
        </div>
      </div>
    );
  };
  
  export default CommodityCard;
import { Commodity } from "../commodity/commodity";
import CounterButton from "../ui/CounterButton";

interface CommodityCardProps {
    commodity: Commodity;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ commodity }) => {
    return (
      <div className="flex items-center justify-right gap-10 border-2 border-black rounded-lg p-4 bg-white shadow-md w-[10vh]] h-[127px] px-10">
        <CounterButton />
        <div className="flex items-center gap-2">
          <span className="text-2xl">{commodity.icon}</span>
          <span className="text-2xl font-semibold">{commodity.name}</span>
        </div>
      </div>
    );
  };
  
  export default CommodityCard;
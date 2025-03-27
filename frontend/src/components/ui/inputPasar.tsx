interface MarketTypeSelectorProps {
    marketType: string;
    setMarketType: (value: string) => void;
  }
  
  const InputPasar = ({ marketType, setMarketType }: MarketTypeSelectorProps) => {
    return (
      <div className="relative w-full">
        <label className="absolute top-1 left-[9px] px-1 text-[14px] font-medium">
          Jenis Pasar
        </label>
        <select
          className="px-2 pt-6 pb-2 text-lg bg-white border border-black rounded-lg shadow-md focus:outline-none h-full w-full"
          value={marketType}
          onChange={(e) => setMarketType(e.target.value)}
        >
          <option value="Pasar Tradisional">Pasar Tradisional</option>
          <option value="Supermarket">Supermarket</option>
        </select>
      </div>
    );
  };
  
  export default InputPasar;
  
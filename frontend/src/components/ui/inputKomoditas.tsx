interface CommoditySelectorProps {
    commodity: string;
    setCommodity: (value: string) => void;
  }
  
  const InputKomoditas = ({ commodity, setCommodity }: CommoditySelectorProps) => {
    return (
      <div className="relative w-full">
        <label className="absolute top-1 left-[9px] px-1 text-[10px] font-medium">
          Komoditas
        </label>
        <select
          className="px-2 pt-2 text-sm font-medium bg-white border border-black rounded-md focus:outline-none h-full w-full"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
        >
          <option value="Beras">Beras</option>
          <option value="Gula">Gula</option>
          <option value="Minyak">Minyak</option>
        </select>
      </div>
    );
  };
  
  export default InputKomoditas;
  
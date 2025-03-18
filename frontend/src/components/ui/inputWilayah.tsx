interface RegionSelectorProps {
    region: string;
    setRegion: (value: string) => void;
  }
  
  const InputWilayah = ({ region, setRegion }: RegionSelectorProps) => {
    return (
      <div className="relative w-full">
        <label className="absolute top-1 left-[9px] px-1 text-[10px] font-medium">
          Wilayah
        </label>
        <select
          className="px-2 pt-2 text-sm font-medium bg-white border border-black rounded-md focus:outline-none h-full w-full"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="Kota Yogyakarta">Kota Yogyakarta</option>
          <option value="Sleman">Sleman</option>
          <option value="Bantul">Bantul</option>
        </select>
      </div>
    );
  };
  
  export default InputWilayah;
  
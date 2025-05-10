interface CommoditySelectorProps {
    commodity: string;
    setCommodity: (value: string) => void;
  }
  
  const InputKomoditasGrafik = ({ commodity, setCommodity }: CommoditySelectorProps) => {
    return (
      <div className="flex flex-col justify-center px-6">
        <h2 className="text-2xl font-medium text-white mb-4">Cari komoditas di sini</h2>
        <select
          className="p-2 text-white caret-white placeholder-white rounded-md border border-white focus:outline-none"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
        >
          <option className="text-black" value="Beras">Beras</option>
          <option className="text-black" value="Gula">Gula</option>
          <option className="text-black" value="Minyak">Minyak</option>
        </select>
      </div>
    );
  };
  
  export default InputKomoditasGrafik;
  
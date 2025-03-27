interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
  }
  
  const inputTanggalRange = ({ startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {
    return (
      <div className="flex gap-2 h-full w-full">
        {/* Tanggal Mulai */}
        <div className="relative w-full">
          <label className="absolute top-1 left-[9px] px-1 text-[10px] font-medium">
            Tanggal Mulai
          </label>
          <input
            type="date"
            className="pl-[11px] pr-2 pt-2 text-sm font-medium bg-white border border-black rounded-md focus:outline-none h-full w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
  
        {/* Tanggal Selesai */}
        <div className="relative w-full">
          <label className="absolute top-1 left-[9px] px-1 text-[10px] font-medium">
            Tanggal Selesai
          </label>
          <input
            type="date"
            className="pl-[11px] pr-2 pt-2 text-sm font-medium bg-white border border-black rounded-md focus:outline-none h-full w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    );
  };
  
  export default inputTanggalRange;
  
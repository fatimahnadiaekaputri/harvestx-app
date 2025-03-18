interface DatePickerProps {
    date: string;
    setDate: (value: string) => void;
  }
  
  const InputTanggal = ({ date, setDate }: DatePickerProps) => {
    return (
      <div className="relative w-full">
        <label className="absolute top-1 left-[9px] px-1 text-[10px] font-medium">
          Tanggal
        </label>
        <input
          type="date"
          className="pl-[11px] pr-2 pt-2 text-sm font-medium bg-white border border-black rounded-md focus:outline-none h-full w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    );
  };
  
  export default InputTanggal;
  
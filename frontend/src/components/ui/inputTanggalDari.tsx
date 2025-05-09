interface DatePickerProps {
    date: string;
    setDate: (value: string) => void;
  }
  
  const InputTanggalDari = ({ date, setDate }: DatePickerProps) => {
    return (
      <div className="relative w-full">
        <label className="absolute top-1 left-[9px] px-1 text-[14px] font-medium">
          Dari tanggal
        </label>
        <input
          type="date"
          className="pl-[11px] pr-2 pt-6 pb-2 text-lg bg-white border border-black rounded-lg focus:outline-none h-full w-full shadow-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    );
  };
  
  export default InputTanggalDari;
  
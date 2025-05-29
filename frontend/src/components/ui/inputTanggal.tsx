interface DatePickerProps {
  date: string;
  setDate: (value: string) => void;
}

const InputTanggal = ({ date, setDate }: DatePickerProps) => {
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 1); // mulai besok
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5); // sampai 5 hari dari sekarang

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="relative w-full">
      <label className="absolute top-1 left-[9px] px-1 text-[14px] font-medium">
        Tanggal
      </label>
      <input
        type="date"
        className="pl-[11px] pr-2 pt-6 pb-2 text-lg bg-white border border-black rounded-lg focus:outline-none h-full w-full shadow-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={formatDate(minDate)}
        max={formatDate(maxDate)}
      />
    </div>
  );
};

export default InputTanggal;

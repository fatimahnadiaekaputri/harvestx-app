interface DatePickerProps {
  date: string;
  setDate: (value: string) => void;
}

const InputTanggal = ({ date, setDate }: DatePickerProps) => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1); // Mulai dari besok

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5); // Sampai 5 hari dari sekarang

  // Format YYYY-MM-DD (mengikuti format HTML input type="date") dalam zona waktu lokal
  const formatDate = (d: Date) => d.toLocaleDateString("en-CA");

  return (
    <div className="relative w-full">
      <label className="absolute top-1 left-[9px] px-1 text-sm font-medium text-gray-700">
        Tanggal
      </label>
      <input
        type="date"
        className="pl-3 pr-2 pt-6 pb-2 text-base bg-white border border-black rounded-lg focus:outline-none w-full shadow-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={formatDate(minDate)}
        max={formatDate(maxDate)}
      />
    </div>
  );
};

export default InputTanggal;

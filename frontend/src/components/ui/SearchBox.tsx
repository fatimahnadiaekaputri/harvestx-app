interface SearchBoxProps {
    search: string;
    setSearch: (value: string) => void;
  }
  
  const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
    return (
      <div className="flex flex-col justify-center px-6">
        <h2 className="text-2xl font-medium text-white mb-4">Cari komoditas di sini</h2>
        <input
          type="text"
          placeholder="Cari komoditas..."
          className="p-2 text-white caret-white placeholder-white rounded-md border border-white focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBox;
  
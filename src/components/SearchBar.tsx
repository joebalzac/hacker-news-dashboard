import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTerm);
    setSearchTerm("");
  };

  const isSearchTerm = searchTerm.toLowerCase().includes(searchTerm);

  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

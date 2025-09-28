import { useState } from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTerm);
    setSearchTerm("");
  };

  const isSearchTerm = (searchTerm: string) => {
    return searchTerm.toLowerCase().includes(searchTerm);
  };

  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        {isSearchTerm(searchTerm) && <div>Search term found</div>}
      </form>
    </div>
  );
};

export default SearchBar;

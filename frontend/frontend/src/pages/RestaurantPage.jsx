import React, { useState } from "react";

const SearchBar = ({ restaurants, setFilteredRestaurants }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);

    const filtered = restaurants.filter((res) =>
      res.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="w-full flex justify-center my-4">
      <input
        type="text"
        placeholder="Search restaurants..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-2/3 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
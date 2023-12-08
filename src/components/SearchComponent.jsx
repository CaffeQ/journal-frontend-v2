import React, { useState } from 'react';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.role.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {result.name} - {result.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;

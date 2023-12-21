import React, { useEffect, useState,useRef  } from 'react';
import SearchService from '../services/SearchService';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('Jane');
  const [searchResults, setSearchResults] = useState([]);
  const [patients, setPatients] = useState([])

  const searchService = useRef(SearchService);


  useEffect(() => {
      console.log("Patients =", patients);
  
    SearchService.getSearch();
  }, []);

  const handleSearch = (e) => {
    console.log("Patients =", patients);
    const term = e.target.value;
    setSearchTerm(term);
    SearchService.postSearch(searchTerm)
      .then((res) => {
        console.log("Search=" + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} - {patient.role}
          </li>
        ))}
      </ul>
    </div>  
  );
};

export default SearchComponent;

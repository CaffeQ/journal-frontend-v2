import React, { useEffect, useState,useRef  } from 'react';
import SearchService from '../services/SearchService';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('Jane');
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const patients = SearchService.getSearch()
      if (patients) {
        setPatients(patients);
      }
  }, []);

  const fetchData = () => {
  try {
    const searchResults = SearchService.getSearch();
    console.log('Processed data:', searchResults);
    if(searchResults)
      setPatients(searchResults)

  } catch (error) {
    console.error('Error fetching search results:', error.message);
  }
};

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

import React, { useEffect, useState,useRef  } from 'react';
import SearchService from '../services/SearchService';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await SearchService.getSearch();
        setPatients([]);
        setPatients(result);
      } catch (error) {
        console.error('Error fetching patient data:', error.message);
      }
    };
  
    fetchData();
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
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            {`Name: ${patient.name}, Age: ${patient.age}, Sex: ${patient.sex}`}
          </li>
        ))}
      </ul>
    </div>
      
  );
};

export default SearchComponent;

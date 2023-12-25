import React, { useEffect, useState,useRef  } from 'react';
import SearchService from '../services/SearchService';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const result = await SearchService.getSearch();
      setPatients(result);
    } catch (error) {
      console.error('Error fetching patient data:', error.message);
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
      <bold>Apache Kafka: </bold>
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

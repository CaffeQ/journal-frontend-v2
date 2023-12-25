import { useState } from "react";
import SearchService from "../services/SearchService";

const SearchQuarkusComponent = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [isPatients, setIsPatients] = useState(false);
    const [patients, setPatients] = useState([])
    const [encounters, setEncounters] = useState([])

    
    const handleToggle = () => {
        setIsPatients(!isPatients);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
      
        if (isPatients) {
          SearchService.getPatients(term)
            .then((res) => {
              setPatients(res.data);
              console.log("Search=" + res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          SearchService.getEncounters(term)
            .then((res) => {
              setEncounters(res);
              console.log("Search=" + res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      

    return(
        <div>
            <bold>Quarkus: </bold>
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            />
            <ul>
            {isPatients
            ? patients && patients.map((patient) => (
                <li key={patient.id}>
                    {`Name: ${patient.name}, Age: ${patient.age}, Sex: ${patient.sex}`}
                </li>
                ))
            : encounters && encounters.map((encounter) => (
                <li key={encounter.id}>
                  <strong>Encounter ID:</strong> {encounter.id}<br />
                  <strong>Date:</strong> {encounter.dateTime}<br />
                  <strong>Patient:</strong> {encounter.patient.name}<br />
                  <strong>Patient Age:</strong> {encounter.patient.age}<br />
                  <strong>Patient Sex:</strong> {encounter.patient.sex}<br />
                  <strong>Staff:</strong> {encounter.staff.name}<br />
                  <strong>Staff Role:</strong> {encounter.staff.role}<br />
                  <strong>Observations:</strong> {encounter.observations.map(observation => observation.observation).join(', ')}
                </li>
              ))}
            </ul>
            <button onClick={handleToggle}>
             {isPatients ? 'Patients' : 'Encounters'}
            </button>
        </div>
    )
}

export default SearchQuarkusComponent
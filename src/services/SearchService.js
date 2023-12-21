import axios from "axios";

const BASE_URL = "http://localhost:8083";

class SearchService{
    postSearch(term){
        return axios.post(BASE_URL + "/quotes/request?value="+term)
    }
    postEncounterSearch(term){
        return axios.post(BASE_URL + "/quotes/request?value="+term)
    }
    getSearch() {
        const patients = [];
        const uniquePatientIds = new Set();
        var source = new EventSource(BASE_URL + "/quotes");
      
        source.onmessage = (event) => {
          console.log("Raw SSE data:", event.data);
          try {
            const serializedPatient = event.data;
            const deserializedPatient = deserializePatient(serializedPatient);
      
            // Check if the patient with the same ID already exists
            if (!uniquePatientIds.has(deserializedPatient.id)) {
              // Add the patient to the array and set to maintain uniqueness
              patients.push(deserializedPatient);
              uniquePatientIds.add(deserializedPatient.id);
      
              console.log("Patients =", patients);
            }
          } catch (error) {
            console.error('Error deserializing SSE data:', error.message);
          }
        };
      
        // Log the initial state of the patients array
        console.log("Patients =", patients);
      
        return patients;
      }
      
      
      
    
}

function deserializePatient(serializedPatient) {
    const regex = /\[Patient\(id=([\w-]+), name=([\w\s]+), age=(\d+), sex=([\w]+), encounters=([\w,]+), diagnoses=([\w,]+)\)\]/;
    const match = serializedPatient.match(regex);
  
    if (!match) {
      throw new Error('Invalid serialized patient format');
    }

    const [, id, name, age, sex, encounters, diagnoses] = match;

    return {
      id,
      name,
      age: parseInt(age, 10),
      sex,
      encounters: encounters.split(',').filter(Boolean),
      diagnoses: diagnoses.split(',').filter(Boolean),
    };
  }

export default new SearchService()
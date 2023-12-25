import axios from "axios";


const BASE_URL = process.env.REACT_APP_SEARCH_SERVICE_URL;

class SearchService{
    postSearch(term){
        console.log("URL="+process.env.REACT_APP_SEARCH_SERVICE_URL)

        return axios.post(BASE_URL + "/quotes/request?value="+term)
    }
    getPatients(term){
        return axios.get(BASE_URL + "/search/patient?value="+term)
    }
    
    getEncounters(term){
        return new Promise((resolve, reject) =>{
            fetch(BASE_URL + "/search/encounter?value="+term)
            .then(response => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`)
                return response.json()
            })
            .then((data) => {
                console.log("getEncounters=", data); 
                resolve(data);
              })
            .catch((error) => {
                console.error('Error:', error)
                throw error;
            })
        })
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

            if (!uniquePatientIds.has(deserializedPatient.id)) {
              patients.push(deserializedPatient);
              uniquePatientIds.add(deserializedPatient.id);
      
              console.log("Patients =", patients);
            }
          } catch (error) {
            console.error('Error deserializing SSE data:', error.message);
            return []
          }
        };
    
        console.log("Patients =", patients);
      
        return patients;
      }
      

}

function deserializePatient(serializedPatient) {
    const regex = /\[Patient\(id=([\w-]+), name=([\w\s]+), age=(\d+), sex=([\w]+), encounters=([\w,]+), diagnoses=([\w,]+)\)\]/
    const match = serializedPatient.match(regex)
  
    if (!match) 
      throw new Error('Invalid serialized patient format')
    

    const [, id, name, age, sex, encounters, diagnoses] = match

    return {
      id,
      name,
      age: parseInt(age, 10),
      sex,
      encounters: encounters.split(',').filter(Boolean),
      diagnoses: diagnoses.split(',').filter(Boolean),
    }
  }

export default new SearchService()
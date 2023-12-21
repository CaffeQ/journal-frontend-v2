import axios from "axios";

const BASE_URL = "http://localhost:8083";

class SearchService{
    postSearch(term){
        return axios.post(BASE_URL + "/quotes/request?value="+term);
    }
    getSearch() {
        const patients = []
        var source = new EventSource("http://localhost:8083/quotes");
        source.onmessage = (event) => {
            console.log("Raw SSE data:", event.data);
            patients.forEach(patient=>{
                const deserializePatient = deserializePatient(patient)
                patients.push(deserializePatient)
            })
        }
        console.log("Returning="+patients)
        return patients
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
import axios from "axios";

const BASE_URL = "http://localhost:8080/journal";

class PatientService{
    getPatients(){
        return axios.get(BASE_URL + "/patients");
    }
    getMyPatientDetails(){
        return axios.get(BASE_URL+ "/patient/details", { withCredentials: true });
    }
    getPatientDetails(id){
        return axios.get(BASE_URL+"/patient?id="+id);
    }
    postObservation(observation){
        return axios.post(BASE_URL+"/observation",observation)
    }
    postEncounter(encounter){
        return axios.post("http://localhost:8080/journal/encounter",encounter);
    }
    //Removed  withCredentials:true, it worked then
}

export default new PatientService()
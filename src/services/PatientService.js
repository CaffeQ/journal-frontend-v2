import axios from "axios";

const BASE_URL = 'http://localhost:8080';

class PatientService{
    getPatients(){
        return axios.get(BASE_URL + "/patients", { withCredentials: true });
    }
    getMyPatientDetails(){
        return axios.get(BASE_URL+ "/patient/details", { withCredentials: true });
    }
    getPatientDetails(id){
        return axios.get("http://localhost:8080/patient?id="+id,{ withCredentials: true });
    }
    postObservation(observation){
        return axios.post(BASE_URL+"/observation",observation ,{ withCredentials: true } )
    }
    postEncounter(encounter){
        return axios.post(BASE_URL+"/encounter",encounter,{ withCredentials: true } );
    }
}

export default new PatientService()
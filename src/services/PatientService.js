import axios from "axios";

const BASE_URL = 'http://localhost:8080';

class PatientService{
    getPatients(){
        return axios.get(BASE_URL + "/patients", { withCredentials: true });
    }
    getPatientDetails(){
        return axios.get(BASE_URL+ "/patient/details", { withCredentials: true });
    }
}

export default new PatientService()
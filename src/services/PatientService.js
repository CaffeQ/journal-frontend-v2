import axios from "axios";

const BASE_URL = 'http://localhost:8080';

class PatientService{
    getPatients(){
        return axios.get(BASE_URL + "/patients", { withCredentials: true });
    }
    getPatientDetails(){
        return axios.get(BASE_URL+ "/patient/details", { withCredentials: true });
    }
    getPatientDiagnosises(id){
        return axios.get("http://localhost:8080/patient?id=4e1bd902-94f3-4623-9843-2248c09f3307",{ withCredentials: true });
    }
}

export default new PatientService()
import axios from "axios";

const BASE_URL = 'http://localhost:8080/patients';

class PatientService{
    getPatients(){
        return axios.get(BASE_URL, { withCredentials: true });
    }
}

export default new PatientService()
import axios from "axios";

const BASE_URL = 'http://localhost:8080/patient';

class PatientService{
    getPatients(){
        return axios.get(BASE_URL);
    }
}

export default new PatientService()
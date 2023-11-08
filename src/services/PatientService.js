import axios from "axios";

const BASE_URL = 'http://localhost:8080/hello';

class PatientService{
    getHello(){
        return axios.get('http://localhost:8080/patient');
    }
}

export default new PatientService()
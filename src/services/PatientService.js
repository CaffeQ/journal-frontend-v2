import axios from "axios";


const BASE_URL = process.env.REACT_APP_PATIENT_SERVICE_URL;

class PatientService{
    getPatients(){
        console.log("URL="+process.env.REACT_APP_PATIENT_SERVICE_URL)

        return axios.get(BASE_URL + "/journal/patients",{ withCredentials: true });
    }
    getMyPatientDetails(){
        return axios.get(BASE_URL+ "/journal/patient/details", { withCredentials: true });
    }
    getPatientDetails(id){
        return axios.get(BASE_URL+"/journal/patient?id="+id,{ withCredentials: true });
    }
    postObservation(observation){
        return axios.post(BASE_URL+"/journal/observation",observation,{ withCredentials: true })
    }
    postEncounter(encounter){
        return axios.post(BASE_URL+"/journal/encounter",encounter,{ withCredentials: true }); // ändra adress
    }
    postCondition(id, diagnosis){
        const url = `${BASE_URL}/journal/diagnosis?patientID=${id}&diagnosis=${encodeURIComponent(diagnosis)}`
        return axios.post(url,{ withCredentials: true }); // ändra adress
    }
    /*
    postCondition(id, diagnosis) {
        const url = `${BASE_URL}/journal/diagnosis?patientID=${id}&diagnosis=${encodeURIComponent(diagnosis)}`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
    }
    */
    //Removed  withCredentials:true, it worked then
}

export default new PatientService()
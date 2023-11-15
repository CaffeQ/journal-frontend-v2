import { useEffect, useState } from "react";
import PatientService from "../services/PatientService";


export default function MyConditionComponent(){
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        PatientService.getMyPatientDetails().then((res) => {
            setPatient(res.data);
            console.log(res.data);
        })
        .catch(err=>{      
            console.log(err);
            console.log("Persmission denied");
        });
    }, []);

    return (
        <div>
            <h2 className="text-center">Patient conditions</h2>
            {patient !== null && patient.diagnoses.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Date</th>
                            <th>Doctor name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {patient.diagnoses.map((diagnosis, index) => (
                            <tr key={index}>
                                <td>{diagnosis.diagnosis}</td>
                                <td>{diagnosis.dateTime}</td>
                                <td>{diagnosis.staff?.accountView?.name || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="box">
                    No diagnoses available
                </div>
            )}
        </div>
    );
}
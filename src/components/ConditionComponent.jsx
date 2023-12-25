import { useEffect, useState } from "react";
import PatientService from "../services/PatientService";
import { useParams } from "react-router-dom";

export default function DetailsComponent() {
    const [patient, setPatient] = useState(null);
    const [condition, setCondition] = useState('');
    const { id } = useParams(); 
    console.log("Patient ID="+id);
    useEffect(() => {
        PatientService.getPatientDetails(id)
            .then((res) => {
                const data = res.data;
                console.log("Data:", data);
                setPatient(data);
            })
            .catch((err) => {
                console.error("Error fetching patient diagnoses:", err);
            });
    }, []);

    const handlePostCondition = () => {
        console.log("Condition="+condition)
        PatientService.postCondition(id,condition)
        .then(res => {
            console.log("succesfull=",res)
        })
        .catch(err=>{
            console.log("Error=",err)
        })
    }

    return (
        <div>
            <h2 className="text-center">Patient conditions</h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handlePostCondition}
                    >
                        Add Condition
                    </button>
                </div>
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
                                <td>{diagnosis.staff.name}</td>
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
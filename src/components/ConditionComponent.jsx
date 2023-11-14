import { useEffect, useState } from "react";
import PatientService from "../services/PatientService";

export default function DetailsComponent(patientDiagnosises) {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        PatientService.getPatientDiagnosises()
            .then((res) => {
                const data = res.data;
                console.log("Data:", data);
                setPatient(data);
            })
            .catch((err) => {
                console.error("Error fetching patient diagnoses:", err);
            });
    }, []);

    return (
        <div>
            <h2 className="text-center">Patient conditions</h2>
            {patient !== null ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Date</th>
                            <th>Doctor name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.diagnoses.map((diagnosis) => (
                            <tr key={diagnosis.id}>
                                <td>{diagnosis.condition}</td>
                                <td>{diagnosis.date}</td>
                                <td>{diagnosis.doctorName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="box">
                    Permission denied
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from "react";
import PatientService from "../services/PatientService";

export default function DetailsComponent(patientDiagnosises) {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        PatientService.getPatientDiagnosises()
            .then((res) => {
                const data = res.data;
                setPatient(data);
                console.log("Data:", data);
                console.log("Server Response:", res);
                console.log("--------");
                console.log("Conditions", patient);
                console.log("--------");
                if (patient) {
                    const { diagnoses } = patient;
                    console.log(diagnoses);
                }
            })
            .catch((err) => {
                console.error("Error fetching patient diagnoses:", err);
            });
    }, []);

    if (patient !== null) {
        return (
            <div>
                <h2 className="text-center">Patient conditions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Date</th>
                            <th>Doctor name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render patient conditions here */}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="box">
                Permission denied
            </div>
        );
    }
}
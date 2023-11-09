
import React, { useState, useEffect } from 'react';
import PatientService from '../services/PatientService'; // Make sure to import your service

export default function PatientComponent() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        PatientService.getPatients().then((res) => {
            setPatients(res.data);
            console.log("--------");
            console.log(patients.patient);
            console.log("--------");
        });
    }, []); // Empty dependency array to mimic componentDidMount

    return (
        <div>
            <h2 className="text-center">Patient Details</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Patient Id</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import PatientService from '../services/PatientService'; // Make sure to import your service
import "./chat/chatComponent.css";

export default function PatientComponent() {
    const [patients, setPatients] = useState([]);
    var isErr = true;
    useEffect(() => {
        PatientService.getPatients().then((res) => {
            setPatients(res.data);
            console.log("--------");
            console.log(patients.patient);
            console.log("--------");
            isErr = false;
        })
        .catch(err=>{
            
            console.log(err);
            console.log("Persmission denied");
        });
    }, []); // Empty dependency array to mimic componentDidMount
    if(patients != null){
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
    }else{
        return(
        <div className='box'>
            Permission denied
        </div>
        );
    }
    
}
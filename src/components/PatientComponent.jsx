
import React, { useState, useEffect } from 'react';
import PatientService from '../services/PatientService'; // Make sure to import your service
import "./chat/chatComponent.css";
import { Link } from 'react-router-dom';

export default function PatientComponent() {
    const [patients, setPatients] = useState([]);
    var isErr = true;
    useEffect(() => {
        PatientService.getPatients().then((res) => {
            setPatients(res.data);
            console.log("--------");
            console.log(res.data);
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
                            <th>Patient Name</th>
                            <th>Patient age</th>
                            <th>Patient sex</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.sex}</td>
                                <td>
                                <Link className="nav-link" to={`/patient/${patient.id}/meetings`}>Meetings</Link>
                                </td>
                                <td>
                                <Link className="nav-link" to={`/patient/${patient.id}/conditions`}>Conditions</Link>
                                </td>
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
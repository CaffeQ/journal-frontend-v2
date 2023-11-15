import React, { useEffect, useState } from "react";  // Import React
import PatientService from "../services/PatientService";
import { useParams } from 'react-router-dom';

export default function MyMeetingsComponent(){
    const [patient, setPatient] = useState(null);
    const [expandedEncounterIndex, setExpandedEncounterIndex] = useState(null); 
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

    const toggleSubrow = (index) => {  
        setExpandedEncounterIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div>
            <h2 className="text-center">Patient meetings</h2>
            {patient !== null && patient.encounters.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Doctor name</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.encounters.map((encounter, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => toggleSubrow(index)} style={{ cursor: 'pointer' }}>
                                    
                                    <td>{encounter.staffName}</td>
                                    <td>{encounter.dateTime}</td>
                                </tr>
                                {expandedEncounterIndex === index && (
                                    <tr>
                                        <td colSpan="2">
                                            {/* Subrow for observations */}
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Observation</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {encounter.observations.map((observation, obsIndex) => (
                                                        <tr key={obsIndex}>
                                                            <td>{observation.observation}</td>
                                                        </tr>
                                                    ))}
                                                    
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="box">
                    No meetings for this patient
                </div>
            )}
        </div>
    );
}
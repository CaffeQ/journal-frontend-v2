import React, { useState, useEffect } from 'react';
import PatientService from '../services/PatientService';
import { useParams } from 'react-router-dom';
import AccountService from '../services/AccountService';

export default function MeetingsComponent() {
    const { id } = useParams();
    console.log("PATIENT ID="+id);
    const [newMeetingDate, setNewMeetingDate] = useState("");
    const [patient, setPatient] = useState(null);
    const [expandedEncounterIndex, setExpandedEncounterIndex] = useState(null);
    const [newObservation,setNewObservation] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [myAccount,setMyAcccount] = useState(null)
    useEffect(() => {
        PatientService.getPatientDetails(id)
            .then((res) => {
                setPatient(res.data);
                console.log("Patient: "+patient);
            })
            .catch((err) => {
                console.error('Error fetching patient details:', err);
            });
    
    }, [id]);
    useEffect(()=>{
        AccountService.getAccountByEmail()
        .then((res)=>{
            console.log("Successfull getting user account",res.data)
            setMyAcccount(res.data)
        })
        .catch(err=>{
            console.log("Unable to fetch user account",err)
        })
    },[])

    const toggleSubrow = (index) => {
        setExpandedEncounterIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    function handleAddObservation(encounterID){
        console.log("EncounterID: " + encounterID);
        const observation = {
            id:"1",
            encounterID:encounterID,
            observation:newObservation,
        };
        console.log()
        PatientService.postObservation(observation);
        console.log("Observation: " + newObservation);
    }
    function handleCreateMeeting(){
        
        const dateObject = new Date(newMeetingDate);

        if (isNaN(dateObject.getTime())) {
            console.error("Invalid date input");
            setErrorMessage("Cant create meeting")
            return;
        }
        const date = dateObject.toISOString();
        console.log("ISOformat: " + date);
        const encounter = {
            id: "1",
            staffID: myAccount.staffID,
            patientID: id,
            date: date
        };
        console.log("New meeting date: " + newMeetingDate);
        console.log("Encounter Object: ", encounter);
        PatientService.postEncounter(encounter)
        .then((res)=>{
            console.log(res.data);
        })
        .catch(err=>{
            setErrorMessage("Cant create meeting")
            console.log("Could not create a new meeting "+ err);
        })
    }

    return (
        <div>
            <h2 className="text-center">Patient meetings</h2>
            <tr>
                <td colSpan="2">
                    <input
                        type="date"
                        value={newMeetingDate}
                        onChange={(e) => setNewMeetingDate(e.target.value)}
                    />
                    <button onClick={handleCreateMeeting}>
                        Create Meeting
                    </button>
                </td>
            </tr>
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
                                                    <tr>
                                                    <td>
                                                        <input
                                                        type="text"
                                                        value={newObservation}
                                                        onChange={(e) => setNewObservation(e.target.value)}
                                                        placeholder="Add a new observation"
                                                        />  
                                                        <button onClick={() => {handleAddObservation(encounter.id)}}>
                                                        Add Observation
                                                        </button>
                                                    </td>
                                                    </tr>
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

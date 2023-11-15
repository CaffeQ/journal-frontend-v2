
import { useEffect, useState } from 'react';
import PatientService from '../services/PatientService';

export default function DetailsComponent(){
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        PatientService.getMyPatientDetails().then((res) => {
            setPatient(res.data);
            console.log("--------");
            console.log(res.data);
            console.log("--------");
        })
        .catch(err=>{      
            console.log(err);
            console.log("Persmission denied");
        });
    }, []);
    if(patient!=null){
        return(
            <div>
            <h2 className="text-center">My Details</h2>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td>{patient.account.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{patient.account.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
       
        )
    }else{
        return(
        <div className='box'>
            Permission denied
        </div>
        );
    }

}
import React, { Component } from 'react'
import PatientService from '../services/PatientService.js'

class PatientComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            patients : []
        }

    }

    componentDidMount(){
        PatientService.getHello().then((res) => {
            this.setState({ patients: res.data});
            console.log("--------");
            console.log(this.state.data);
            console.log("--------");
        });
    }
    render(){
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
                        {
                            this.state.patients.map(patient =>
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{patient.name}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PatientComponent
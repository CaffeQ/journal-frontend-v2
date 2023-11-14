import './loginComponent.css';
import AccountService from '../../services/AccountService.js';
import {useState} from "react";
import { useParams } from 'react-router-dom';
import Account from '../../Entities/Account.js';

export default function SignUpComponent(){
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [name,setName] = useState(null);
    const [role,setRole] = useState(null);
    const [loginStatus,setLoginStatus] = useState(null);
    function handleSubmit(){
        const account = new Account("string", email, password, name);
        AccountService.postAccount(account,role)
        .then((res) => {
            setLoginStatus('success');
        })
        .catch(err=> {
            setLoginStatus('error');
        })

    }
    console.log(email);
    console.log(password);
    
    return(
    <div className="center">
        <strong className="title"> Sign up! </strong>
        <form>
        <p>Email</p>
            <input onChange={e=> setEmail(e.target.value)} type="text" />
        <label className="text">
          
        </label>
        <p>Password</p>
            <input onChange={e=> setPassword(e.target.value)} type="password" />
        <label className="text">
        </label>
        <p>Name</p>
            <input onChange={e=> setName(e.target.value)} type="test" />
        <label className="text">
        </label>
        <div>
            <label>
                <input
                    type="radio"
                    value="patient"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "patient"} // Assuming you have a state variable 'role'
                />
                Patient
            </label>
            <label>
                <input
                    type="radio"
                    value="doctor"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "doctor"} // Assuming you have a state variable 'role'
                />
                Doctor
            </label>
            <label>
                <input
                    type="radio"
                    value="other"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "other"} // Assuming you have a state variable 'role'
                />
                Other
            </label>
        </div>
        <div className="text">
            <button onClick={handleSubmit} type="button">Submit</button>
        </div>
            <div className="login-wrapper"></div>
        </form>
        {loginStatus == 'success' && <p>Successfull sign up!</p>}
        {loginStatus == 'error' && <p>Sign up failed.</p>}
    </div>
    )
}
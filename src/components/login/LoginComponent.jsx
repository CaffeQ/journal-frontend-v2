import './loginComponent.css';
import AccountService from '../../services/AccountService.js';
import {useState} from "react";
import { useParams } from 'react-router-dom';
import Account from '../../Entities/Account.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "../navbarComponent.css";
import Cookies from 'js-cookie';

export default function LoginComponent(){
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [password,setPassword] = useState(null);
    const [loginStatus,setLoginStatus] = useState(null);
    function handleSubmit(){
        //const accountLogin = new Account("string", email, password, name);
        const accountLogin = {
            id: "string",
            email: email,
            password: password,
            name: "string",
            role: "patient",
            staffID: "e17b5430-9d28-4ca1-8982-bcc370bd92e5",
            patientID: "e17b5430-9d28-4ca1-8982-bcc370bd92e5"
        }/*
        const accountLogin = {
            id: "f74fe927-8540-4513-bdf0-b9d84406d088",
            email: "timpim@email.com",
            password: "password",
            name: "john doe",
            role: "doctor",
            staffID: "e17b5430-9d28-4ca1-8982-bcc370bd92e5",
            patientID: null
        }*/
        console.log("Account login=",accountLogin)
        /*
        const accountLogin = {
            id: "f74fe927-8540-4513-bdf0-b9d84406d088",
            email: email,
            password: password,
            name: "john doe",
            role: "doctor",
            staffID: "e17b5430-9d28-4ca1-8982-bcc370bd92e5",
            patientID: null
        };
        */
        AccountService.loginAccount(accountLogin)
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
        <strong> Log in! </strong>
        <form>
        <p>Email</p>
            <input onChange={e=> setEmail(e.target.value)} type="text" />
        <label className="text">
        </label>
        <p>Password</p>
            <input onChange={e=> setPassword(e.target.value)} type="password" />
        <label className="text">
        </label>
        <Link className="nav-link" to="/signUp">Sign up</Link>
        <div className="text">
            <button onClick={handleSubmit} type="button">Submit</button>
        </div>
            <div className="login-wrapper"></div>
        </form>
        {loginStatus == 'success' && <p>Successfull login!</p>}
        {loginStatus == 'error' && <p>login failed.</p>}
    </div>
    )
}
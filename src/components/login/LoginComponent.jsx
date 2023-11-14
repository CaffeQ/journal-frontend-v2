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

export default function LoginComponent(){
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [password,setPassword] = useState(null);
    const [loginStatus,setLoginStatus] = useState(null);
    function handleSubmit(){
        const account = new Account("string", email, password, name);
        AccountService.loginAccount(account)
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
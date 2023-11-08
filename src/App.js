import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import PatientComponent from './components/PatientComponent';
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent';

function App() {
  const [state, setstate] = useState(null);
  return (
    <div>
      <NavbarComponent/>
      <header className="container">
         <PatientComponent />
      </header>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />
    </div>
  );

}

export default App;

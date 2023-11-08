import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import PatientComponent from './components/PatientComponent';
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'

function App() {
  const [state, setstate] = useState(null);
  return (
    <div>
      <h1>Hello</h1>
      
    </div>
  );

}

export default App;

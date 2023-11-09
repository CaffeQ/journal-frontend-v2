import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import PatientComponent from './components/PatientComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import LoginComponent from './components/login/LoginComponent';
import SignUpComponent from './components/login/SignUpComponent';
import { Container } from './components/Container';
import { ChatComponent } from './components/chat/ChatComponent';

function App() {
  const [state, setstate] = useState(null);
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <Container>
        <Routes>
              <Route path="/journal" element={<PatientComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signUp" element={<SignUpComponent />} />
              <Route path="/chats" element={<ChatComponent />} />
        </Routes>
        </Container>

      </Router>
     

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

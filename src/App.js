import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [state, setstate] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:8080/patient')
      .then((response) => response.json())
      .then((data)=> {
        console.log(data);
        setstate(data)
      })
      .catch((err)=>{
        console.log(err.message);
      })
  },[])

  if(state != null)
    return(
      <html>
        <body>
          <h1>{state.id}</h1>
          <p>{state.name}</p>
        </body>
      </html>
    )
  else
  return(
    <html>
      <body>
        <p>loading...</p>
      </body>
    </html>
  )

}

export default App;

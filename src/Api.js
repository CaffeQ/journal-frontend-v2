import { useState } from "react";

const BASE_URL = 'http://localhost/8080';
function apiCall (url, method, body, headers) {
    fetch('http://localhost/8080/hello',{
        method: 'GET'
    })
        .then((res) => (res.json()))
}

const getPatient = ( ) =>{
    return fetch('http://localhost/8080/hello')
    .then((res) => (res.json())
    )
    .catch((err) => {
        console.log(err.message);
    })
}

export {getPatient}

//const data = await apiCall('Post', {data:"hamada"}, {'Content-Type': 'application-json'})
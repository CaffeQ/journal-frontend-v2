#Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

$env:REACT_APP_ACCOUNT_SERVICE_URL = "http://localhost:8081"
$env:REACT_APP_CHAT_SERVICE_URL = "http://localhost:8082"
$env:REACT_APP_IMAGE_SERVICE_URL = "http://localhost:8084"
$env:REACT_APP_PATIENT_SERVICE_URL = "http://localhost:8080"
$env:REACT_APP_SEARCH_SERVICE_URL = "http://localhost:8083"
npm start;
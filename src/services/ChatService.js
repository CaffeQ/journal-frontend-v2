import axios from "axios";
import Account from '../Entities/Account'


const BASE_URL = process.env.REACT_APP_CHAT_SERVICE_URL;

class ChatService{
    getAllUsers() {
        return new Promise((resolve, reject) => {
          axios.get(BASE_URL+"/account",{ withCredentials: true })
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }

      getUser(){
        return new Promise((resolve, reject) => {
          axios.get(BASE_URL+"/account/chat",{ withCredentials: true } )
            .then(response => {
               resolve(response);
            })
            .catch(error => {
               reject(error);
            });
        });
      }

      getUserConversation(toEmail){
        return new Promise((resolve, reject) => {
          axios.get(BASE_URL+"/account/chatTo?toEmail="+toEmail,{ withCredentials: true } )
            .then(response => {
               resolve(response);
            })
            .catch(error => {
               reject(error);
            });
        });
      }
      postMessage(toEmail, message) {
        const encodedToEmail = encodeURIComponent(toEmail);
        const encodedMessage = encodeURIComponent(message);
    
        return fetch(`${BASE_URL}/account/chat?toEmail=${encodedToEmail}&message=${encodedMessage}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
    }

      
}

export default new ChatService();
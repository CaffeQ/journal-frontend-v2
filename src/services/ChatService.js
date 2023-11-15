import axios from "axios";
import Account from '../Entities/Account'
const BASE_URL = 'http://localhost:8080';

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

      
}

export default new ChatService();
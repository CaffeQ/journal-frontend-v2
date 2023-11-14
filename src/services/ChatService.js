import axios from "axios";
import Account from '../Entities/Account'
const BASE_URL = 'http://localhost:8080';

class ChatService{
    getUserChats() {
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

      getUser(email){
        return new Promise((resolve, reject) => {
          axios.get("http://localhost:8080/accountid?email=" + email,{ withCredentials: true } )
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
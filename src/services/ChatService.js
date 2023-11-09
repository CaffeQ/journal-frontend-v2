import axios from "axios";
import Account from '../Entities/Account'
const BASE_URL = 'http://localhost:8080';

class ChatService{
    getUserChats() {
        return new Promise((resolve, reject) => {
          axios.get(BASE_URL+"/chat")
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
}
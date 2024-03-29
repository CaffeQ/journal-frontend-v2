import axios from "axios";
import Account from '../Entities/Account'


const BASE_URL = process.env.REACT_APP_ACCOUNT_SERVICE_URL;

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
          axios.get(BASE_URL+"/account/message/chat?toEmail="+toEmail,{ withCredentials: true } )
            .then(response => {
              console.log("Conversation=",response.data)
              resolve(response);
            })
            .catch(error => {
               reject(error);
            });
        });
      }
      postMessage(toEmail, message) {
        const encodedToEmail = encodeURIComponent(toEmail)
        const encodedMessage = encodeURIComponent(message)
      
        return axios.post(
          `${BASE_URL}/account/send?toEmail=${encodedToEmail}&message=${encodedMessage}`,
          {
            toEmail: encodedToEmail,
            message: encodedMessage
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            return response.data
          })
          .catch(error => {
            console.error('Error posting message:', error)
            throw new Error('Failed to post message')
          })
      }

      
}

export default new ChatService();
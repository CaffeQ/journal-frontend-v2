import axios from "axios";
import Account from '../Entities/Account'

const BASE_URL = process.env.REACT_APP_ACCOUNT_SERVICE_URL;
console.log("URL="+BASE_URL)
class AccountService {
    loginAccount(accountLogin) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/account/login", accountLogin
   /*     //, {
   //       crossDomain: true,
          headers: {
            'Content-Type': 'application/json'
          }*/
       // }
        )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
      
    }

    postAccount(signUpRequest) {
      console.log("Sign up request: " + signUpRequest)
        return new Promise((resolve, reject) => {
          axios.post(BASE_URL+"/account/signup", signUpRequest)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
  }
export default new AccountService();
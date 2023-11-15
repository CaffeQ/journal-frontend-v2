import axios from "axios";
import Account from '../Entities/Account'
const BASE_URL = 'http://localhost:8080';
class AccountService {
    loginAccount(account) {
      return new Promise((resolve, reject) => {
        axios.post(BASE_URL+"/account/login", account,{ withCredentials: true })
          .then(response => {


            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    postAccount(account,role) {
      console.log(role + " " + account)
        return new Promise((resolve, reject) => {
          axios.post(BASE_URL+"/account/signup?role="+role, account)
            .then(response => {
              document.cookie = "session=" + response.data.sessionId;
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
  }
export default new AccountService();
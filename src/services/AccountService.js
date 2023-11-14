import axios from "axios";
import Account from '../Entities/Account'
const BASE_URL = 'http://localhost:8080';
class AccountService {
    loginAccount(account) {
      return new Promise((resolve, reject) => {
        axios.post(BASE_URL+"/account/login", account,{ withCredentials: true })
          .then(response => {
            console.log("Server response:", response);
            console.log("session=" + response.data.sessionId);
            document.cookie = "session=" + response.data.sessionId;
/*
            const cookie = (response.headers['set-cookie'])
                  .find(cookie => cookie.includes("session"))
                  ?.match(new RegExp(`^session=(.+?);`))
                  ?.[1];
                  */
                  const setCookieHeader = response.headers['set-cookie'];
                  if (setCookieHeader) {
                    console.log("Set-Cookie Header:", setCookieHeader);
                  }

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
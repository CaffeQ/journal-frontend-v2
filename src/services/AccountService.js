import axios from "axios";
import Account from '../Entities/Account'
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_ACCOUNT_SERVICE_URL;
console.log("URL="+BASE_URL)
class AccountService {
  loginAccount(accountLogin) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL +"/account/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountLogin),
        credentials: 'include'
      })
        .then(response => {
          console.log("Headers: ", response.headers);

          const token = response.headers.get("Authorization");
          console.log("Token=", token);
          
          Cookies.set("Authorization",token)

          Cookies.set("Email",accountLogin.email)
          console.log("Email cookie=",Cookies.get("Email"))

          axios.defaults.headers.common["Authorization"] = token
          console.log("Saved cookie: ", Cookies.get("Authorization"));

        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

    postAccount(signUpRequest) {
      console.log("Sign up request: " + signUpRequest)
        return new Promise((resolve, reject) => {
          axios.post(BASE_URL + "/account/signup", signUpRequest)
            .then(response => {
              
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }

      getAccountByEmail(){
        const email = Cookies.get("Email")
        if(email == null)
          return
        return new Promise((resolve, reject) => {
          axios.get(BASE_URL + "/account/userEmail?email="+email,
          {withCredentials: true})
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
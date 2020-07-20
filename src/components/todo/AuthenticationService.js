import axios from 'axios';
import { URL_API } from '../../Constans.js';

export const USERNAME_SESSION_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get(`${URL_API}/basicauth`, 
        {
            headers : {authorization : this.createBasicAuthHeader(username, password)}
        })
    }

    executeJWTAuthenticationService(username, password){
        return axios.post(`${URL_API}/authenticate`, {username, password});
    }

    createBasicAuthHeader(username, password){
        return 'Basic ' + window.btoa(`${username}:${password}`);
    }

    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(USERNAME_SESSION_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthHeader(username, password));
    }

    registerSuccessfulToken(username, token){
        sessionStorage.setItem(USERNAME_SESSION_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token));

    }
    
    createJwtToken(token){
        return 'Bearer ' + token;
    }


    logout(){
        sessionStorage.removeItem(USERNAME_SESSION_NAME);
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem(USERNAME_SESSION_NAME);
        if (user === null) return false
        return true

    }
    getUsername(){
        let user = sessionStorage.getItem(USERNAME_SESSION_NAME);
        if (user === null) return '';
        return user;

    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}
export default new AuthenticationService()
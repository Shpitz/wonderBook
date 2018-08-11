import StorageService from '../services/StorageService.js'
import axios from 'axios'
var STORAGE_KEY = 'loggedinUser';
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/' : 'http://localhost:3000';

var loggedinUser = StorageService.load(STORAGE_KEY) || null;
if (loggedinUser) {
    console.log('succesful-login frontend!!!')
}

function signup(userDetails) {
    return axios.post(`${BASE_URL}/signup`, userDetails)
        .then(({ data }) => {
            _setLoggedinUser(data)
            return data;
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${BASE_URL}/checkLogin`, userCreds)
        .then(({ data }) => {
            _setLoggedinUser(data)
            return data;
        })
        .catch(err => err)
}

function logout() {
    loggedinUser = null;
    StorageService.store(STORAGE_KEY, null)
    return axios.post(`${BASE_URL}/logout`)
}

function getLoggedinUser() {
    // debugger;
    return axios.get(`${BASE_URL}/getLogin`)
        .then((res)=>{
            return res.data;
        })
        .catch(()=>{console.log('catch inside user service frontend')})
    // return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    StorageService.store(STORAGE_KEY, loggedinUser);
}


export default {
    signup,
    login,
    logout,
    getLoggedinUser
}
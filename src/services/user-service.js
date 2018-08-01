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
        .then(_ => {
            _setLoggedinUser(data)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${BASE_URL}/checkLogin`, userCreds)
        .then(({ data }) => {
            _setLoggedinUser(data)
        })
        .catch(err => err)
}

function logout() {
    loggedinUser = null;
    StorageService.store(STORAGE_KEY, null)
}

function getLoggedinUser() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    StorageService.store(STORAGE_KEY, loggedinUser)
    console.log('succesful-login');
}


export default {
    signup,
    login,
    logout,
    getLoggedinUser
}
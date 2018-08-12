import axios from 'axios'
import userSerivce from '../services/user-service.js'
// //actions
export const LOG_IN = 'user/actions/logIn'
export const LOAD_USER = 'user/actions/loadUser'
export const SIGN_UP = 'user/actions/signUp'
export const LOG_OUT = 'user/actions/logOut'

// // mutations
export const SET_USER = 'user/mutations/setUser'



// // getters
export const GET_USER = 'user/getters/getUser'



export default {
    state: {
        user: null,
    },
    mutations: {
        [SET_USER](state, { user }) {
            state.user = user
        },
    },
    getters: {
        [GET_USER](state) {
            var user =  state.user
            return user
        }
    },
    actions: {
        [LOG_IN](store, { loginDetails }) {
            return userSerivce.login(loginDetails)
                .then(user => {
                    store.commit({ type: SET_USER, user })
                })
                .catch(err=>{
                    throw 'login faild '
                })
        },
        [LOAD_USER](store, { userId }) {
            return userSerivce.getLoggedinUser()
                .then(user => {
                    store.commit({ type: SET_USER, user })                
                    return user;
                })
        },
        [SIGN_UP](store, { signupDetails }) {
            return userSerivce.signup(signupDetails)
                .then(user => {
                    store.commit({ type: SET_USER, user })   
                })
        },
        [LOG_OUT](store) {
            return userSerivce.logout()
                .then(() => {
                    store.commit({ type: SET_USER, user:null })
                })
        },
    }
}

import { Accounts } from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor'
//constant
import {SET_USER_DATA, HANDLE_ERROR} from '../constant'

export function setError(err) {
    return {
        type: HANDLE_ERROR,
        err
    }
}

export function setUserEmail(email) {
    return {
        type: SET_USER_DATA,
        email
    }
}

export function createUser(email, password) {
    return (dispatch) => {
        Accounts.createUser({email, password}, (error) => {
            if(error) {
                return dispatch(setError(error.reason))
            } 
            return dispatch(setUserEmail(email))
        });
       
    }
}


export function loginWithPassword(email, password) {
    return (dispatch) => {
        Meteor.loginWithPassword({email}, password, (error) => {
            if(!error) {
                return  dispatch(setUserEmail(email));
            }
            return dispatch(setError(error));
        })
    }
}

export function logout() {
    return (dispatch) => {
        Accounts.logout((error) => {
            if(error) {
                return dispatch(setError(error))
            }
        });
    }
}
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor'
//constant
import {
    SET_USER_DATA,
    HANDLE_ERROR,
    SWITCH_MODE_STRUCTURE,
    SWITCH_MODE_EMPLOYEE,
    SWITCH_MODE_BRANCH,
    ADD_NEW_BRANCH
} from '../constant'

export function setError(err) {
    return {type: HANDLE_ERROR, err}
}

export function setUserEmail(email) {
    return {type: SET_USER_DATA, email}
}

export function createUser(email, password) {
    return (dispatch) => {
        Accounts.createUser({
            email,
            password
        }, (error) => {
            if (error) {
                return dispatch(setError(error.reason))
            }
            return dispatch(setUserEmail(email))
        });

    }
}

export function loginWithPassword(email, password) {
    return (dispatch) => {
        Meteor.loginWithPassword({
            email
        }, password, (error) => {
            if (!error) {
                return dispatch(setUserEmail(email));
            }
            return dispatch(setError(error));
        })
    }
}

export function logout() {
    return (dispatch) => {
        Accounts.logout((error) => {
            if (error) {
                return dispatch(setError(error))
            }
        });
    }
}

/**
|--------------------------------------------------
| SWITCH EDITING MODE
|--------------------------------------------------
*/

export function branchEditMode() {
    return {type: SWITCH_MODE_BRANCH}
}
export function structureEditMode() {
    return {type: SWITCH_MODE_STRUCTURE}
}
export function employeeEditMode() {
    return {type: SWITCH_MODE_EMPLOYEE}
}

/**
|--------------------------------------------------
| BRANCH REST ACTIONS
|--------------------------------------------------
*/

function addNewBranch(branch) {
    return {type: ADD_NEW_BRANCH, payload: branch}
}

export function addNewBranchAsync(branch) {
    return (dispatch) => {

        Meteor.call('branch.insert', branch, (err, resp) => {
            if (!err) {
                dispatch(addNewBranch({
                    _id: resp,
                    ...branch
                }));
            } else {
                dispatch(setError(err))
            }
        });

    }
}
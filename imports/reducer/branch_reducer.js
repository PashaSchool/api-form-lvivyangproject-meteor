import {ADD_NEW_BRANCH, GET_ALL_BRANCH, SELECTED_BRANCH, RESET_SELECTED_BRANCH, UPDATE_BRANCH, REMOVE_BRANCH} from '../constant'
import {combineReducers} from 'redux'

const initialState = [];

function branchArray(state = initialState, action) {
    switch(action.type) {
        case ADD_NEW_BRANCH: 
            return [...state, action.payload];
        case GET_ALL_BRANCH:
            return [...state, ...action.payload];
        case UPDATE_BRANCH:
            return state.map(function(item) {
                if(item._id === action._id) {
                    return Object.assign({}, item, action.updates)
                }
                return item
            });
        case REMOVE_BRANCH: 
            return state.filter(x => x._id !== action._id)
        default:
            return state
    }
}
const defaultSelected = {};

function selectedBranch(state = defaultSelected, action) {
    switch(action.type) {
        case SELECTED_BRANCH:
            return Object.assign({}, action.branch)
        case RESET_SELECTED_BRANCH:
            return {}
        default:
            return state
    }
}

const branch = combineReducers({
    branchArray,
    selectedBranch
})

export default branch
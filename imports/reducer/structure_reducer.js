import { RESET_SELECTED_STRUCTURE, GET_ALL_STRUCTURE, ADD_NEW_STRUCTURE}from '../constant'

import {combineReducers} from 'redux'

const initialState = [];
function structureArray(state = initialState, action) {
    switch(action.type) {
        case ADD_NEW_STRUCTURE:
            return [...state, action.payload]
        case GET_ALL_STRUCTURE:
            return [...state, ...action.payload];
        default:
            return state
    }
}



const defaultSelected = {};
function selectedBranch(state = defaultSelected, action) {
    switch(action.type) {
        case SELECTED_STRUCTURE:
            return Object.assign({}, action.stucture)
        case RESET_SELECTED_STRUCTURE:
            return {}
        default:
            return state
    }
}


const structure = combineReducers({
    selectedStructure,
    structureArray
});

export default structure
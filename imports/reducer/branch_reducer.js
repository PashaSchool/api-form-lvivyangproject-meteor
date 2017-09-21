import {ADD_NEW_BRANCH} from '../constant'

const initialState = [];

function branch(state = initialState, action) {
    switch(action.type) {
        case ADD_NEW_BRANCH: 
            return [...state, action.payload]
        default:
            return state
    }
}

export default branch
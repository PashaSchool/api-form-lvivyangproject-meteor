import {CREATE_USER, SET_USER_DATA, HANDLE_ERROR} from '../constant'

const initialState = {
    email: '',
    err: ''
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {...state, email: action.email};        
        case HANDLE_ERROR:
            return {...state, err: action.err};
        default:
            return state
    }
}

export default user
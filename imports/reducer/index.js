import {CREATE_USER, SET_USER_DATA, HANDLE_ERROR} from '../constant'
import {combineReducers} from 'redux'

import user from './user_reducer'


const reducer = combineReducers({
    user
})
export default reducer
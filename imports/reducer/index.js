import {combineReducers} from 'redux'

//reducers
import user from './user_reducer'
import switcher from './muteMode_reducer'
import branch from './branch_reducer'

const reducer = combineReducers({
    user,
    switcher,
    branch
})

export default reducer
import {SWITCH_MODE_STRUCTURE, SWITCH_MODE_EMPLOYEE, SWITCH_MODE_BRANCH} from '../constant'

const initState = {
    branchEditMode: false,
    structureEditMode: false,
    employeeEditMode: false
}

function switcher(state = initState, action) {
    switch(action.type) {
        case SWITCH_MODE_BRANCH:
            return {...state, branchEditMode: !state.branchEditMode};
        case SWITCH_MODE_STRUCTURE:
            return {...state, structureEditMode: !state.structureEditMode};
        case SWITCH_MODE_EMPLOYEE:
            return {...state, employeeEditMode: !state.employeeEditMode};
        default:
            return state
    }
}

export default switcher

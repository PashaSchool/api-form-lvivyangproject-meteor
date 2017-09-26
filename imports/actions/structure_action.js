import {ADD_NEW_STRUCTURE} from '../actions'
import {setError} from './index'
import {Meteor} from 'meteor/meteor'

function addNewStructure(idBranch, structure) {
    return {
        type: ADD_NEW_STRUCTURE,
        idBranch,
        structure 
    }
}


export function addNewStructureAsync(idBranch, structure) {
    return (dispatch) => {
        Meteor.call('branch.addUnitStructure', idBranch, structure, (err, res) => {
            if(!err) {
                dispatch(addNewStructure(idBranch, structure))
            }
            dispatch(setError(err));
        })
    }
}
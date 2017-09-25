import React, {Component} from 'react'
//components
import HeaderForm from './HeaderForm'
import FormDropDown from './FormDropDown'
import BranchFormFields from './BranchFormFields'

import {connect} from 'react-redux'
//actions
import {branchEditMode, getAllBranchAsync, selectCurentBranch, resetSelectedBranch} from '../actions'

class FormContainerBranch extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getAllBranch();
    }
    
    componentWillReceiveProps({branchEdit, _idOfSelectedBranch: newSelected, branch}) {
        const {resetSelectedBranch, branch: prevBranch, _idOfSelectedBranch: curentSelected, selectedBrunch} = this.props;

        if(!branchEdit && this.props.branchEdit && Object.keys(curentSelected).length > 0) {
            resetSelectedBranch();
        };

        if(Object.keys(newSelected).length > 0 && Object.keys(curentSelected).length > 0) {
            if(branch.length === prevBranch.length) {
                const updatedBranch = branch.find(x => x._id === curentSelected._id);
                for(let key in curentSelected) {
                    if(curentSelected[key] !== updatedBranch[key]) {
                        selectedBrunch(updatedBranch)
                    }
                }       
            } 
            if(branch.length < prevBranch.length) {
                resetSelectedBranch();
            }
        }

    }
    render() {
        const {branchEdit, branchEditMode, selectedBrunch, branch, _idOfSelectedBranch} = this.props;
        return (
            <div>
               <HeaderForm title="Branch" isChecked={branchEdit} handleOnChange={() => branchEditMode()}/>
               {branchEdit && <FormDropDown item={branch} onChange={selectedBrunch} selectedTitle={_idOfSelectedBranch.title}/>}
               <BranchFormFields/>
            </div>
        )
    }
};


const mapStateToProps = ({branch, switcher}) => ({
    branchEdit: switcher.branchEditMode,
    branch: branch.branchArray,
    _idOfSelectedBranch: branch.selectedBranch
});

const mapDispatchToProps = (dispatch) => {
    return {
        branchEditMode: () => dispatch(branchEditMode()), /* toggle drop Down menu */
        getAllBranch: () => dispatch(getAllBranchAsync()),  /* get All branch */
        selectedBrunch: (branch) => dispatch(selectCurentBranch(branch)),
        resetSelectedBranch: () => dispatch(resetSelectedBranch())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormContainerBranch)

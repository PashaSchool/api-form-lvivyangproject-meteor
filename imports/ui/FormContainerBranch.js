import React from 'react'

//components
import HeaderForm from './HeaderForm'
import FormDropDown from './FormDropDown'
import BranchFormFields from './BranchFormFields'


import {connect} from 'react-redux'
//actions
import {branchEditMode, getAllBranchAsync, selectCurentBranch} from '../actions'

class FormContainerBranch extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.getAllBranch()
        // _idOfSelectedBranch
    }

    render() {
        // console.log("RENDER COMPONENT");
        const {branchEdit, branchEditMode, selectedBrunch, branch, _idOfSelectedBranch} = this.props;
        return (
            <div>
                <HeaderForm title="Branch" isChecked={branchEdit} handleOnChange={() => branchEditMode()}/>
                {branchEdit && <FormDropDown item={branch} onChange={(branch) => { 
                        let obj = JSON.parse(branch);
                        selectedBrunch(obj)
                     }}
                />}
                <BranchFormFields/>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    branchEdit: state.switcher.branchEditMode,
    branch: state.branch.branchArray,
    _idOfSelectedBranch: state.branch.selectedBranch
});

const mapDispatchToProps = (dispatch) => {
    return {
        branchEditMode: () => dispatch(branchEditMode()),
        getAllBranch: () => dispatch(getAllBranchAsync()),
        selectedBrunch: (branch) => dispatch(selectCurentBranch(branch))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FormContainerBranch)
import React from 'react'

//components
import HeaderForm from './HeaderForm'
import FormDropDown from './FormDropDown'
import BranchFormFields from './BranchFormFields'

import {connect} from 'react-redux'
//actions
import {branchEditMode} from '../actions'

class FormContainerBranch extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {branchEdit, branchEditMode} = this.props;
        console.log("this.props.branchEdit is", branchEdit)
        return (
            <div>
                <HeaderForm title="Branch" isChecked={branchEdit} handleOnChange={() => branchEditMode()}/>
                {branchEdit && <FormDropDown/>}
                <BranchFormFields/>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    branchEdit: state.switcher.branchEditMode
});

const mapDispatchToProps = (dispatch) => {
    return {
        branchEditMode: () => dispatch(branchEditMode())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FormContainerBranch)
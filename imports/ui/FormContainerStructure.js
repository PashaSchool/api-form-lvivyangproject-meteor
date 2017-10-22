import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// actions
import {structureEditMode} from '../actions'

//components
import HeaderForm from './HeaderForm'
import FormDropDown from './FormDropDown'
import StructureFormFields from './StructureFormFields'

class FormContainerStructure extends Component {
    static propTypes {
        editStructureMode: PropTypes.bool.isRequired,
        onChangeMode: PropTypes.func.isRequired
    }
    render() {
        const { editStructureMode, onChangeMode } = this.props;
        return (
            <div>
                <HeaderForm title="Structure" isChecked={editStructureMode} handleOnChange={() => onChangeMode()}/>
                <FormDropDown item={[]} selectedTitle="selected title" onChange={() => {}}/>
                <StructureFormFields />
            </div>

        )
    }
}


const mapStateToProps = ({switcher}) => ({
  editStructureMode: switcher.structureEditMode
});

export default connect(mapStateToProps, {mapDispatchToProps})(FormContainerStructure)

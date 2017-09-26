import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';

import uuidv4 from 'uuid/v4'

//component
import FormButtonsGroup from './FormButtonsGroup'
// ui components
import TextField from 'material-ui/TextField'

import {addNewStructureAsync} from '../actions/structure_action'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    }
  });


class StructureFormFields extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: ''
        }
    }
    handleChange = name => e => {
        let value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    handleAddBranch = (structure, addStructure) => {
        if (structure.title.length > 0 && structure.description.length > 0) {
            addStructure("someBranchId", structure)
            this.clearFieldsValue('title', 'description');
        }
    }
    clearFieldsValue = (...inputs) => {
        inputs.map(item => this.setState({[item]: ''}))
    }
    render() {
        const { title, description } = this.state;
        const {handleChange} = this;
        const {addStructure, structureEditMode} = this.props;

        const structure = {title, description};
        return (
                <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        value={title}
                        onChange={handleChange('title')}
                        name="title"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        label="Title"
                    />
                    <TextField
                        value={description}
                        onChange={handleChange('description')}
                        name="description"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        label="description"
                    />
                </form>
                <div>
                <FormButtonGroup 
                    showEditMode={structureEditMode}
                    addItem={() => this.handleAddBranch(structure, addStructure)}
                    removeItem={() => {}}
                    editItem={() => {}}
                    clearFields={() => {}}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({structure, switcher}) => ({
  structure: structure.structureArray,
  structureEditMode: switcher.structureEditMode
})

const mapDispatchToProps = (dispatch) => {
    return {
        addStructure: (branchId, structure) => dispatch(addNewStructureAsync(branchId, structure))
    }
}

export default connect(null, null)(withStyles(styles)(StructureFormFields))
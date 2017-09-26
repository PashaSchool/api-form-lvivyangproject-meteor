import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
//components
import FormButtonGroup from './FormButtonsGroup';

//actions
import {addNewBranchAsync, updateBranchAsync, resetSelectedBranch, removeBranchAsync} from '../actions';

// ui components
import TextField from 'material-ui/TextField'

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


class BranchFormFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            order: 0
        }
    }

    handleChange = name => e => {
        let value = e.target.value;
        if(e.target.type === 'number') {
            return this.setState({
                [name] : parseInt(value)
            })
        }
        return this.setState({
            [name] : value
        })
    }
    handleAddBranch = (branch, addBranch) => {
        if (branch.title.length > 0 && parseInt(branch.order) > 0) {
            addBranch(branch)
            this.clearFieldsValue('title', 'order');
        }
    }
    handleUpdateBranch = (_id, updates) => {
        this.props.updateBranch(_id, updates)
    }
    componentWillReceiveProps({selectedBranch, branchEdit}) {
        if(Object.keys(selectedBranch).length > 0) {
            this.setState({
                title: selectedBranch.title,
                order: selectedBranch.order
            })
        }
        if(Object.keys(selectedBranch).length === 0 && !branchEdit) {
            this.clearFieldsValue('title', 'order');
        }
        if(Object.keys(selectedBranch).length === 0) {
            this.clearFieldsValue('title', 'order')
        }
    }
    clearFieldsValue = (...inputs) => {
        inputs.map(item => this.setState({[item]: ''}))
    }
    detectUpdates = (thisState, thisProps) => {
        const updates = {};
        for(key in thisProps) {
            if(thisProps[key] === thisProps._id) continue;
            if(thisProps[key] === thisState[key]) continue;
            updates[key] = thisState[key]
        }
        return {...updates}
    }

    render() {
        const {title, order} = this.state;
        const {handleChange, clearFieldsValue, handleAddBranch, detectUpdates, state} = this;
        const {branchEdit, addBranch, classes, selectedBranch, updateBranch, removeBranch} = this.props;

        const branch = {
            title,
            order: parseInt(order)
        };
        const updates = detectUpdates(state, selectedBranch);

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
                        value={order}
                        onChange={handleChange('order')}
                        name="order"
                        className={classes.textField}
                        type="number"
                        margin="normal"
                        label="Order"
                    />
                </form>
                <div>
                <FormButtonGroup 
                    showEditMode={branchEdit}
                    addItem={() => handleAddBranch(branch, addBranch)}
                    removeItem={() => removeBranch(selectedBranch._id)}
                    editItem={() => this.handleUpdateBranch(selectedBranch._id, updates)}
                    clearFields={() => clearFieldsValue('title', 'order')}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({switcher, branch}) => ({
    branchEdit: switcher.branchEditMode,
    selectedBranch: branch.selectedBranch 
})

const mapDispatchToProps = (dispatch) => ({
    addBranch: (branch) => dispatch(addNewBranchAsync(branch)),
    updateBranch: (id, updates) => dispatch(updateBranchAsync(id, updates)),
    resetSelectedBranch: () => dispatch(resetSelectedBranch()),
    removeBranch: (_id) => dispatch(removeBranchAsync(_id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BranchFormFields))

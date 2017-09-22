import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//components
import FormButtonGroup from './FormButtonsGroup';

//actions
import {addNewBranchAsync, updateBranchAsync} from '../actions';

class BranchFormFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            order: 0
        }
    }

    handleChange = (e) => {
        let value = e.target.value;

        if(e.target.name === 'order') {
            return this.setState({
                [e.target.name]: parseInt(value)
            })
        }
        return this.setState({
            [e.target.name]: value
        })
    }
    handleAddBranch = (branch, addBranch) => {
        if (branch.title.length > 0 && parseInt(branch.order) > 0) {
            return addBranch(branch)
        }
        return
    }
    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.selectedBranch).length > 0) {
            this.setState({
                title: nextProps.selectedBranch.title,
                order: nextProps.selectedBranch.order
            })
        }
    }
    clearFieldsValue = (...inputs) => {
        inputs
            .filter(function(item) {
                return item.value !== '' && (item.type === 'text' || item.type === 'number')
            })
            .map(function(item) { 
                return item.value === ''
            }) 
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
        const {addBranch, selectedBranch, branchEdit, updateBranch} = this.props;
        const {titleNode, orderNode, handleAddBranch, clearFieldsValue, detectUpdates} = this;
        const branch = {
            title,
            order: parseInt(order)
        };
        const updates = this.detectUpdates(this.state, selectedBranch);
        const isEditMode = (Object.keys(selectedBranch).length > 0) && branchEdit;
        return (
            <div>
                <div>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={this.handleChange}
                        ref={node => this.titleNode = node}/>
                    <input
                        type='number'
                        placeholder='order'
                        name='order'
                        value={order}
                        onChange={this.handleChange}
                        ref={node => this.orderNode = node}/>
                </div>
                <div>
                    <FormButtonGroup
                        editItem={() => updateBranch(selectedBranch._id, updates)}
                        clearFields={() => clearFieldsValue(titleNode, orderNode)}
                        addItem={() =>  handleAddBranch(branch, addBranch)}
                        showEditMode={branchEdit}/>
                </div>
            </div>
        )
    }
}
BranchFormFields.propTypes = {
    branchEdit: PropTypes.bool.isRequired,
    addBranch: PropTypes.func.isRequired,
    selectedBranch: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    branchEdit: state.switcher.branchEditMode,
    selectedBranch: state.branch.selectedBranch 
})

const mapDispatchToProps = (dispatch) => {
    return {
        addBranch: (branch) => dispatch(addNewBranchAsync(branch)),
        updateBranch: (id, updates) => dispatch(updateBranchAsync(id, updates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchFormFields)
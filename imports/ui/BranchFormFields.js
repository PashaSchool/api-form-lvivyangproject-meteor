import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//components
import FormButtonGroup from './FormButtonsGroup'


//actions
import {addNewBranchAsync} from '../actions'
// const initState = {     branchEditMode: false,     structureEditMode: false,
//    employeeEditMode: false }

class BranchFormFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            order: 0
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleAddBranch = (branch, addBranch) => {
        if(branch.title.length > 0 && +branch.order > 0) {
           return addBranch(branch)
        } 
        return 
    }
    render() {
        const {title, order} = this.state;
        const {addBranch} = this.props;

        const branch = {title, order};

        return (
            <div>
                <div>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        onChange={this.handleChange}
                        ref={node => this.title = node}/>
                    <input
                        type='number'
                        placeholder='order'
                        name='order'
                        onChange={this.handleChange}
                        ref={node => this.order = node}/>
                </div>
                <div>
                    <FormButtonGroup addItem={this.handleAddBranch(branch, addBranch)} showEditMode={this.props.branchEdit}/>
                </div>
            </div>
        )
    }
}

BranchFormFields.propTypes = {
    branchEdit: PropTypes.bool.isRequired,
    addBranch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({branchEdit: state.switcher.branchEditMode})

const mapDispatchToProps = (dispatch) => {
    return {
        addBranch: (branch) => dispatch(addNewBranchAsync(branch))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchFormFields)
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//components
import FormButtonGroup from './FormButtonsGroup';

//actions
import {addNewBranchAsync} from '../actions';

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
        if(branch.title.length > 0 && parseInt(branch.order) > 0) {
            return addBranch(branch)
        } 
        return
    }
    clearFieldsValue = (...inputs) => {
        
        inputs.filter(function(item){
            return item.value !== '' && (item.type === 'text' || item.type === 'number')
        }).map(function(item) {
            return item.value = '';
        })  
    }
    
    render() {
        const {title, order} = this.state;
        const {addBranch} = this.props;
        const {titleNode, orderNode, handleAddBranch, clearFieldsValue} = this;
        const branch = {title, order: parseInt(order) };
        console.log("yyyyy")
        return (
            <div>
                <div>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        onChange={this.handleChange}
                        ref={node => this.titleNode = node}/>
                    <input
                        type='number'
                        placeholder='order'
                        name='order'
                        onChange={this.handleChange}
                        ref={node => this.orderNode = node}/>
                </div>
                <div>
                    <FormButtonGroup clearFields={() => clearFieldsValue(titleNode, orderNode)}  addItem={() => this.handleAddBranch(branch, addBranch)} showEditMode={this.props.branchEdit}/>
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
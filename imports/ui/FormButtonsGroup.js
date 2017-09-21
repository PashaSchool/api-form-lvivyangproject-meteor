import React from 'react'
import PropTypes from 'prop-types'

const FormButtonGroup = ({showEditMode, addItem, clearFields}) => {
    function triggerButtonGroup() {
        if(!showEditMode) {
            return (
                <div>
                    <button onClick={() => addItem()}>Add</button>
                    <button onClick={() => clearFields()}>Reset Fields</button>
                </div>
            )
        }
        return (
            <div>
                <button>Delete</button>
                <button>Edit</button>
            </div>
        )
    }
    return triggerButtonGroup()
}


FormButtonGroup.propTypes = {
    showEditMode: PropTypes.bool.isRequired,
    addItem: PropTypes.func
}

export default FormButtonGroup
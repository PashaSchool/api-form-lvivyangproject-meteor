import React from 'react'
import PropTypes from 'prop-types'

const FormButtonGroup = ({showEditMode, addItem}) => {
    function triggerButtonGroup() {
        if(!showEditMode) {
            return (
                <div>
                    <button onClick={addItem}>Add</button>
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
    showEditMode: PropTypes.bool.isRequired
}

export default FormButtonGroup
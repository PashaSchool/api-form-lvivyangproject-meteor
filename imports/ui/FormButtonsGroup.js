import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    }
  });

const FormButtonGroup = ({showEditMode, addItem, clearFields, editItem, removeItem, classes}) => {
    function triggerButtonGroup() {
        if(!showEditMode) {
            return (
                <div>
                    <Button raised color="primary" className={classes.button} onClick={addItem}>Add</Button>
                    <Button raised dense  className={classes.button} onClick={clearFields}>Reset Fields</Button>
                </div>
            )
        }
        return (
            <div>
                <Button raised color="accent" className={classes.button} onClick={removeItem}>Delete</Button>
                <Button raised dense  className={classes.button} onClick={editItem}>Edit</Button>
            </div>
        )
    }
    return triggerButtonGroup()
}


// FormButtonGroup.propTypes = {
//     showEditMode: PropTypes.bool.isRequired,
//     addItem: PropTypes.func,
//     clearFields: PropTypes.func,
//     editItem: PropTypes.func,
//     removeItem: PropTypes.func,
// }

export default withStyles(styles)(FormButtonGroup)
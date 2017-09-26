import React from 'react'
import PropTypes from 'prop-types'

//material-ui components
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles'

//component
import FormContainerBranch from './FormContainerBranch'
import FormContainerStructure from './FormContainerStructure'

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      width: 500,
      margin: theme.spacing.unit * 2,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    }),
  });
  

const WrapperForm = ({classes}) => (
    <section>
        <Paper className={classes.root}> 
            <FormContainerBranch/>
        </Paper>
        <Paper className={classes.root}> 
            <FormContainerStructure/>
        </Paper>
    </section>
);

PropTypes.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WrapperForm)
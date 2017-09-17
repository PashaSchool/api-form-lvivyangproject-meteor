import React from 'react'
import {Accounts} from 'meteor/accounts-base'
import {NavLink } from 'react-router-dom'
//hoc
import {withStyles} from 'material-ui/styles';
//components ui
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
    },
    flex: {
        marginRight: 30
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
})

const DashboardNavigation = (props) => {
    const {classes} = props;
    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        <NavLink activeClassName="selected"  to="/devloyaut">HOME</NavLink >
                    </Typography>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        <NavLink activeClassName="selected" to="/devloyaut/doc">DOC</NavLink >
                    </Typography>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        <NavLink activeClassName="selected" to="/devloyaut/api">API</NavLink >
                    </Typography>
                    <Button onClick={() => Accounts.logout()} color="contrast">Logout</Button>
                </Toolbar>
            </AppBar>
        </header>
    )
};

export default withStyles(styles)(DashboardNavigation)
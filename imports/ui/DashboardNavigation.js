import React from 'react';
import { NavLink } from 'react-router-dom';

// hoc
import { withStyles } from 'material-ui/styles';
// components ui
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import { connect } from 'react-redux';
// action
import { blue } from 'material-ui/colors';
import { logout } from '../actions';


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: blue[500],
  },
  flex: {
    marginRight: 30,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const DashboardNavigation = ({ classes, logout }) => (
  <header>
    <AppBar position="static" className={classes.root}>
      <Toolbar className="navigation">
        <div className="navigation__list">
          <Typography type="title" color="inherit" className={classes.flex}>
            <NavLink exact activeClassName="selected" to="/devloyaut">HOME</NavLink >
          </Typography>
          <Typography type="title" color="inherit" className={classes.flex}>
            <NavLink exact activeClassName="selected" to="/devloyaut/doc">DOC</NavLink >
          </Typography>
          <Typography type="title" color="inherit" className={classes.flex}>
            <NavLink activeClassName="selected" to="/devloyaut/api">API</NavLink >
          </Typography>
        </div>
        <div>
          <Button onClick={() => logout()} color="contrast">Logout</Button>
        </div>

      </Toolbar>
    </AppBar>
  </header>
);

const mapStateToProps = state => ({
  email: state.email,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardNavigation));

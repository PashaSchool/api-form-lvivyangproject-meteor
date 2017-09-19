import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { Accounts } from 'meteor/accounts-base';
// components
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//action
import {loginWithPassword}  from '../actions'


import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    width: 350,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  indedUp: {
    marginTop: 20,
  },
  center: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      password: '',
    };
  }
  handleChange(e) {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    });
  }
  handleClick() {
    const { email, password } = this.state;
    if (password.length < 8) {
      return this.setState({ error: 'Your password should have more then 8 characters' });
    }
    if (email === '' || password === '') {
      return this.setState({ error: 'All fields is required' });
    }

    this.props.loginWithPassword(email, password);

  }
  render() {
    const { error } = this.state;
    function isErrorMessageShowUp() {
      return (
        <Typography type="headline">
          Error — {error}
        </Typography>
      );
    }
    const { classes } = this.props;
    return (
      <div className="form-intro-wrapper">
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              Login
            </Typography>
          </CardContent>
          <CardContent className={classes.center}>
            <Input
              onChange={e => this.handleChange(e)}
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
            <Input
              onChange={e => this.handleChange(e)}
              type="password"
              name="password"
              placeholder="Enter password..."
              className={classes.indedUp}
            />
          </CardContent>
          <CardActions className={classes.center}>
            <Button raised color="primary" onClick={() => this.handleClick()}>Login</Button>
          </CardActions>
          <Typography type="body2">
            <Link to='/signin'>Create Account ?</Link>
          </Typography>
          {this.state.error !== '' ? isErrorMessageShowUp() : undefined}
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    loginWithPassword: (email, password) => {
      dispatch(loginWithPassword(email, password))
    }
  }
}

function mapStateToProps(state) {
  return {
    err: state.err
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

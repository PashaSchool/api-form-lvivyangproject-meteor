import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base'
// components
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    maxWidth: 275,
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

const Signin = (props) => {
  const { classes } = props;
  return (
    <div className="form-intro-wrapper">
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
                        Signup a new account
          </Typography>
        </CardContent>
        <CardContent className={classes.center}>
          <Input type="email" placeholder="Enter your email..." />
          <Input type="password" placeholder="Enter password..." className={classes.indedUp} />
        </CardContent>
        <CardActions className={classes.center}>
          <Button raised color="primary">Signin</Button>
        </CardActions>
      </Card>
    </div>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);

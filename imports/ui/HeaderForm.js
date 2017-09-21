import React from 'react';
import PropTypes from 'prop-types'
// mateial ui components
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';


const HeaderForm = ({isChecked, handleOnChange, title}) => (
  <div style={{display: 'flex'}}>
    <Typography type="body1">{title}</Typography>
    <Switch
      checked={isChecked}
      onChange={handleOnChange}
    />
  </div>
);

HeaderForm.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
}

export default HeaderForm;

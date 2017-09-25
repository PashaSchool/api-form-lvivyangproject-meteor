import React from 'react';
import PropTypes from 'prop-types'
// mateial ui components
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';


const HeaderForm = ({isChecked, handleOnChange, title}) => (
  <div style={{display: 'flex', justifyContent:"space-between"}}>
    <Typography type="display2">{title}</Typography>
    <FormControlLabel
      control={
        <Switch
          checked={isChecked}
          onChange={handleOnChange}
        />
      }
      label="switch mode"
    />
  </div>
);

HeaderForm.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
}

export default HeaderForm;

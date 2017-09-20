import React from 'react';

// mateial ui components
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';


const HeaderForm = ({ title, onHandleChangeMode, checkedEditMode }) => (
  <div>
    <Typography type="body1">{title}</Typography>
    <Switch
      checked={checkedEditMode}
      onChange={() => onHandleChangeMode()}
    />

  </div>
);

export default HeaderForm;

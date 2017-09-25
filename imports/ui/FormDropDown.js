import React from 'react';
import PropTypes from 'prop-types'

//material ui components
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

function renderOptions(item) {
    let json = JSON.stringify(item);
    return <option key={item._id} value={json}>{item.title}</option>
}

const FormDropDown = ({onChange, item, selectedTitle}) => (
    <div style={{display: 'flex'}}>
        <Select
            native
            value={selectedTitle !== '' ? selectedTitle : 'select'}
            onChange={(e) => {
                let beObject = JSON.parse(e.target.value);
                onChange(beObject)
                }}
            input={< Input id = "age-native-simple" />}>
            <option value={selectedTitle !== '' ? selectedTitle : 'select'}/>
            {item.map(renderOptions)}
        </Select>
        <Typography type="subheading">Selected: {selectedTitle}</Typography>
    </div>
);

FormDropDown.propTypes = {
    onChange: PropTypes.func.isRequired,
    item: PropTypes.array,
    selectedTitle: PropTypes.string
}

export default FormDropDown;


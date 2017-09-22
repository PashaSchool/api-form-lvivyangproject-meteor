import React from 'react';
import PropTypes from 'prop-types'

//material ui components
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';

function renderOptions(item) {
    let json = JSON.stringify(item);
    return <option key={item._id} value={json}>{item.title}</option>
}

const FormDropDown = ({onChange, item, selectedTitle}) => (
    <div>
        <Select
            native
            value={selectedTitle !== '' ? selectedTitle : 'select'}
            onChange={(e) => onChange(e.target.value)}
            input={< Input id = "age-native-simple" />}>
            <option value=""/>
            {item.map(renderOptions)}
        </Select>
    </div>
);

FormDropDown.propTypes = {
    onChange: PropTypes.func.isRequired,
    item: PropTypes.array,
    selectedTitle: PropTypes.object
    
}

export default FormDropDown;

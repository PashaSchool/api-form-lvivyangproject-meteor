import React from 'react';

//material ui components
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';

const DropDownMenu = ({handleSelectItem, selectedItem}) => (
    <div>
        <Select
            native
            value={selectedItem}
            onChange={handleSelectItem('selectedItem')}
            input={< Input id = "age-native-simple" />}>
            <option value=""/>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
        </Select>
    </div>
);

export default DropDownMenu;

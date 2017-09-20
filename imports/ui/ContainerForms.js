import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

// import WrapperForm from './WrapperForm'
import HeaderForm from './HeaderForm';
import FieldsContainer from './FieldsContainer';
import DropDownMenu from './DropDownMenu';

// material ui components
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: theme
        .mixins
        .gutters({
            paddingTop: 16,
            paddingBottom: 16,
            margin: 20,
            marginTop: theme.spacing.unit * 3
        })
});

class ContainerForms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedEditMode: false,
            selectedItem: ''
        };
    }
    onHandleChangeMode() {
        const {checkedEditMode} = this.state;
        this.setState({
            checkedEditMode: !checkedEditMode
        });
    }
    handleSelectItem = selected => event => {
        this.setState({
            [selected] : event.target.value
        })
    }
    render() {
        const {classes } = this.props;
        const {checkedEditMode, selectedItem} = this.state;
        return (
            <Paper className={classes.root} elevation={4}>
                <HeaderForm
                    title="test title"
                    checkedEditMode={checkedEditMode}
                    onHandleChangeMode={() => this.onHandleChangeMode()}/>
                    {checkedEditMode && <DropDownMenu selectedItem={selectedItem} handleSelectItem={this.handleSelectItem}/>}
                <FieldsContainer/>
            </Paper>
        );
    }
}

ContainerForms.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainerForms);

import React, {component} from 'react'

class WrapperForm extends Component {
    state = {
        addMode: true
    }
    render() {
        return (
            <section>
                <div>
                    <h3>Here iesome title</h3>
                    <button onClick={() => this.setState({addMode: !this.state.addMode})}>switch</button>
                </div>
                <div>
                    {!this.state.addMode && <dropDown selectItem={this.props.data}>}
                    <TextFieldsForm fields/>
                </div>
            </section>
        )
    }
}

export default WrapperForm
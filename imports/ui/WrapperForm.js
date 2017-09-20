import React, {component} from 'react'

import ContainerForms from './ContainerForms'
class WrapperForm extends Component {
    state = {
        addMode: true
    }
    render() {
        return (
            <section>
                <ContainerForms/>
            </section>
        )
    }
}

export default WrapperForm
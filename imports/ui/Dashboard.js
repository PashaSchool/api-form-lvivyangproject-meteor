import React, {Component} from 'react'
import {Accounts} from 'meteor/accounts-base'

class Dashboard extends Component {
    render() {
        return (
            <p onClick={() => Accounts.logout()}>Dashboard</p>
        )
    }
}

export default Dashboard
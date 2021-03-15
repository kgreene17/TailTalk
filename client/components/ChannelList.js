import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1'


export class ChannelList extends Component {
    render() {
        const filterMessageChannel = id =>
            this.props.messages.messages.filter(m => m.channelId === id)
        const randomMessages = filterMessageChannel(1)
        return (
            <ul>
                <li>
                    <NavLink to={RANDOM_CHANNEL} activeClassName="active">
                        <span>Chat with a vet!</span>
                        <span className="badge">{ randomMessages.length }</span>
                    </NavLink>
                </li>
            </ul>
        )
    }
}

const mapState = state => ({
    messages: state.messages,
})

export default withRouter(connect(mapState)(ChannelList))

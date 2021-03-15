import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import Homepage from './Homepage'
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import {Login, Signup} from './auth-form'
import { fetchMessages } from '../store/messages'

export class Main extends Component {

  componentDidMount () {
    this.props.loadMessages()
  }

  render () {
    return (
      <div>
        <Sidebar/>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route path="/channels/1" component={MessagesList} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
          </Switch>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(fetchMessages()),
})

export default withRouter(connect(null, mapDispatchToProps)(Main))

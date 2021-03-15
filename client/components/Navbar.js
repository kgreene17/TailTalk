import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import NameEntry from './NameEntry'

export const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="menu">
          {/* The navbar will show these links after you log in */}
          <h2>Easy to access vet = one happy pet!</h2>
          <Link to="/">Home</Link>
          <Link to="/channels/1"> Chat </Link>
          {/* <Redirect to="/channels/1"></Redirect> */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <h2>Easy to access vet = one happy pet!</h2>
          <Link to="/"> Home </Link>
          <Link to="/channels/1"> Chat </Link>
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Sign Up </Link>

        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
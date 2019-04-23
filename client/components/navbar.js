import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-static-top navbar-dark bg-primary">
        <div className="container">
          <Link to="/">
            <h1 className="navs">Hopflix</h1>{' '}
          </Link>
          {isLoggedIn ? (
            <div className="navbar-header">
              {/* The navbar will show these links after you log in */}
              <Link className="navs" to="/home">
                Home
              </Link>
              <a className="navs" href="#" onClick={handleClick}>
                Logout
              </a>
              <Link className="navs" to="/movies">
                Movies
              </Link>
              <Link className="navs" to={`/users/${user.id}/cart`}>
                Cart
              </Link>
            </div>
          ) : (
            <div className="navbar-header">
              {/* The navbar will show these links before you log in */}
              <Link className="navs" to="/login">
                Login
              </Link>
              <Link className="navs" to="/signup">
                Sign Up
              </Link>
              <Link className="navs" to="/movies">
                Movies
              </Link>
              <Link className="navs" to="/guest/cart">
                Cart(Guest)
              </Link>
            </div>
          )}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

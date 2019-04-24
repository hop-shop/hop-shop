import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class carousel extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hopflix has the best flix!</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <Link to="/movies">
          <button className="btn btn-primary btn-lg" href="#" role="button">
            Browse Movies
          </button>
        </Link>
      </div>
    )
  }
}

export const Carousel = connect()(carousel)

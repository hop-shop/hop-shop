import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class carousel extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hopflix has the best flix!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <Link to="/movies">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Browse Movies
          </a>
        </Link>
      </div>
    )
  }
}

export const Carousel = connect()(carousel)

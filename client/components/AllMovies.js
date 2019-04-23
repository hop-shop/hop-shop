import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allMoviesThunk} from '../store/movie'
import {Link} from 'react-router-dom'

export class DisconnectedAllMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {

    return this.props.movies.map(movie => {
      return (
        <div key={movie.id}>
        <Link to={`movies/${movie.id}`}>
          <h3>{movie.title}</h3>
          <img src={movie.imageUrl} />
          <span>{movie.price}</span>
        </Link>
        </div>
      )
    })
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: function() {
      return dispatch(allMoviesThunk())
    }
  }
}

export const AllMovies = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedAllMovies)

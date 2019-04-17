import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allMoviesThunk} from '../store/movie'

export class DisconnectedAllMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {
    console.log('in the component')

    return this.props.movies.map(movie => {
      return (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <img src={movie.img} />
          <span>{movie.price}</span>
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

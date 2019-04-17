import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'

class disconnectedSingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.fetchSingleMovie(movieId)
  }
  render() {
    const movie = this.props.movie
    console.log(movie)
    return (
      <div key={movie.id}>
       <h3>{movie.title}</h3>
       <img src={movie.img} />
      <span>{movie.price}</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
return {
  movie: state.movie
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleMovie: function(id) {
      return dispatch(fetchMovieThunk(id))
    }
  }
}



export const SingleMovie = connect(mapStateToProps,
  mapDispatchToProps)
  (disconnectedSingleMovie)

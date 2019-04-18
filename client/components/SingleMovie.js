import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'

export class DisconnectedSingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.fetchSingleMovie(movieId)
  }
  render() {
    const movie = this.props.movie
    //console.log(movie)
    if (movie && movie.id){


    return (
      <div key={movie}>
       <h3>{movie.title}</h3>
       <a>Add To Cart</a>
       <img src={movie.imageUrl} />
      <span>{movie.price}</span>
      </div>
    )
    } else{
      return "Loading"
    }
  }
}

const mapStateToProps = state => {
return {
  movie: state.singleMovie
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
  (DisconnectedSingleMovie)

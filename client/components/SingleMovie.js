import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'

export class SingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.fetchSingleMovie(movieId)
  }

  render() {
    const movie = this.props.movie
    return (
      <div id = "single-movie">
      <div>
       <h3>{movie.id}</h3>
       <img src={movie.img} />
      <span>{movie.price}</span>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
return {
  movie: state.singleMovie
  }
}

const mapDispatchToProps = dispatch => ({
fetchSingleMovie: (id) =>
  dispatch(fetchMovieThunk(id))
})



export default connect(mapStateToProps,
  mapDispatchToProps)
  (SingleMovie)

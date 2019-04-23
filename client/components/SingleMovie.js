import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'
import {addToCartThunk} from '../store/cart'

export class DisconnectedSingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.fetchSingleMovie(movieId)
  }
  render() {
    const {movie,user,addToCart} = this.props
    if (movie && movie.id) {
      return (
        <div key={movie.id}>
          <h3>{movie.title}</h3>

          <button type="button" onClick={()=>addToCart(user.id, movie.id)}>
            Add to Cart
          </button>
          <br />
          <img src={movie.imageUrl} />
          <span>{movie.price}</span>
        </div>
      )
    } else {
      return 'Loading'
    }
  }
}

const mapStateToProps = state => {
  return {
    movie: state.singleMovie,
    user: state.user
  }
}

//const mapDispatchToProps = {fetchMovieThunk, addToCartThunk}
const mapDispatchToProps = (dispatch) => ({
    fetchSingleMovie:(id)=>dispatch(fetchMovieThunk(id)),
    addToCart:(userId, movieId)=>dispatch(addToCartThunk(userId, movieId))
})

export const SingleMovie = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleMovie
)

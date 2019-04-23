import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'
import {addToCartThunk} from '../store/cart'

export class DisconnectedSingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.fetchMovieThunk(movieId)
  }
  render() {
    const {movie} = this.props
    const {user} = this.props
    if (movie && movie.id) {
      return (
        <div>
          <h3>{movie.title}</h3>
          <button type="button" onClick={addToCartThunk(user.id, movie.id)}>
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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = {fetchMovieThunk, addToCartThunk}

export const SingleMovie = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleMovie
)

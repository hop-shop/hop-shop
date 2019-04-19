import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'
import {addToCartThunk} from '../store/cart'

export class DisconnectedSingleMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id
    console.log('first movieid', movieId)
    this.props.fetchMovieThunk(movieId)
  }
  render() {
    console.log(this.props.cart)
    const movie = this.props.movie
    const {user} = this.props
    console.log(user)
    //console.log(movie)
    if (movie && movie.id) {
      console.log('SECOND', movie.id)
      return (
        <div key={movie.id}>
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

export const SingleMovie = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSingleMovie)

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
    const {movie, user, addToCart, cart} = this.props
    if (movie && movie.id) {
      return (
        <div className="singleMovie">
          <div>
            <img className="image" src={movie.imageUrl} />
          </div>
          <div className="card singleMovieCard" key={movie.id}>
            <div className="card-header">
              <h3>{movie.title}</h3>
            </div>

            <div className="card-body ">
              <h5 className="card-title">Price: ${movie.price}</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>

              {user.id ? (
                <a
                  href="#"
                  onClick={() => addToCart(user, movie.id, movie)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => addToCart(null, null, movie)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </a>
              )}
            </div>
          </div>
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

const mapDispatchToProps = dispatch => ({
  fetchSingleMovie: id => dispatch(fetchMovieThunk(id)),
  addToCart: (userId, movieId, movie) =>
    dispatch(addToCartThunk(userId, movieId, movie))
})

export const SingleMovie = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSingleMovie)

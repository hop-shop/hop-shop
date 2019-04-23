import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieThunk} from '../store/singleMovie'
import {addToCartThunk}from '../store/cart'



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
              <a
                href="#"
                onClick={addToCartThunk(user.id, movie.id)}
                className="btn btn-primary"
              >
                Add to Cart
              </a>
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




const mapDispatchToProps = dispatch => {
  return {
    fetchMovieThunk: function(id) { return dispatch(fetchMovieThunk(id)) },
    addToCartThunk: function(userId, movieId) { return dispatch(addToCartThunk(userId, movieId)) }
 }
}

export const SingleMovie = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSingleMovie)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allMoviesThunk} from '../store/movie'
import {Link} from 'react-router-dom'
import {addToCartThunk} from '../store/cart'
import {addToGuestCart} from '../store/guestCart'
let styles1 = {
  maxWidth: '500px'
}

export class DisconnectedAllMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {
    const {user,addToCart, addToGuestCart} = this.props
    return (
      <div className="container">
        {this.props.movies.map(movie => {
          return (
            <div
              style={styles1}
              className="card mb-3 allmovie text-dark"
              key={movie.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img className="card-img" src={movie.imageUrl} />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-dark">
                    <Link
                      style={{textDecoration: 'none'}}
                      to={`movies/${movie.id}`}
                    >
                      <h3 className="card-title text-dark">{movie.title}</h3>
                      <span className="card-text text-dark">
                        Price: ${movie.price}
                      </span>
                    </Link>
                  </div>
                  <div className="card-body">
                  {user.id ? (
                    <a href="#" onClick={() => addToCart(user.id, movie.id)} className="btn btn-outline-primary">
                      Add to Cart
                    </a>
                  ):(
                    <a
                      href="#"
                      onClick={() => addToGuestCart(movie)}
                      className="btn btn-outline-primary"
                    >
                      Add To Cart
                    </a>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movies,
    user:state.user,
    GuestCart: state.GuestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: function() {
      return dispatch(allMoviesThunk())
    },
    addToCart: (userId, movieId) => dispatch(addToCartThunk(userId, movieId)),
    addToGuestCart: movie => dispatch(addToGuestCart(movie))
  }
}

export const AllMovies = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllMovies
)

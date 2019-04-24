import React, {Component} from 'react'
import {connect} from 'react-redux'
import StripeApp from './StripeApp.js'
import {getCartThunk, deleteMovieFromCart} from '../store/cart'

export class DisconnectedCart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.id)
  }
  render() {
    const cart = this.props.cart
    const totalPrice = cart.reduce((a, b) => {
      return +(a + b.movie.price)
    }, 0)
    const {deleteMovieFromCart} = this.props
    return (
      <div>
        {cart && cart.length ? (
          <div>
            {cart.map(cartItem => {
              return (
                <div key={cartItem.movieId}>
                  <h3>{cartItem.movie.title}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      deleteMovieFromCart(cartItem.userId, cartItem.movieId)
                    }
                  >
                    Remove From Cart
                  </button>
                  <img
                    src={cartItem.movie.imageUrl}
                    className="img-thumbnail"
                  />
                  <span>{cartItem.movie.price}</span>
                </div>
              )
            })}
            <div>
              <span>
                Total Price:{totalPrice}

              </span>
            </div>
            <div>
              <StripeApp />
            </div>
          </div>
        ) : (
          'No Items Currently in the Cart'
        )}
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: function(userId) {
      return dispatch(getCartThunk(userId))
    },
    deleteMovieFromCart: function(userId, movieId) {
      return dispatch(deleteMovieFromCart(userId, movieId))
    }
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)

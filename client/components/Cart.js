import React, {Component} from 'react'
import {connect} from 'react-redux'
import StripeApp from './StripeApp.js'
import {getCartThunk, deleteMovieFromCart} from '../store/cart'
import CartCheckout from './CartCheckout'
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
      <div className="container">
        {cart && cart.length ? (
          <div>
            <ul className="list-group">
              <CartCheckout />
              {cart.map(cartItem => {
                return (
                  <li key={cartItem.movieId} className="list-group-item">
                    <div className="row">
                      <div className="col-sm">
                        <img
                          src={cartItem.movie.imageUrl}
                          className=" image img-thumbnail"
                        />
                      </div>
                      <div className="col-sm">
                        <h3>{cartItem.movie.title}</h3>
                        <span>Price: ${cartItem.movie.price}</span>
                      </div>
                      <div className="col-sm">
                        <button
                          className="close"
                          aria-label="Close"
                          type="button"
                          onClick={() =>
                            deleteMovieFromCart(
                              cartItem.userId,
                              cartItem.movieId
                            )
                          }
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
              <li className="list-group-item">
                <div className="row">
                  <div className="col-sm">
                    <span className="justify-left">
                      Total Price:{' '}
                      {cart.reduce((a, b) => {
                        return +(a + b.movie.price)
                      }, 0)}
                    </span>
                  </div>
                </div>
              </li>
              <div className="card text-center">
                <div className="card-header">
                  <a href="#" className="btn btn-primary">
                    Checkout Now
                  </a>
                </div>
              </div>
            </ul>
            ) })}
            <div>
              <span>Total Price:{totalPrice}</span>
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

export const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCart)

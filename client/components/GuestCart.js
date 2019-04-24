import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteMovieFromCart} from '../store/cart'
import CartCheckout from './CartCheckout'
export class DisconnectedGuestCart extends Component {
  componentDidMount() {
    this.props.fetchCart()
    console.log('called!')
  }
  render() {
    const cart = this.props.cart
    const {deleteMovieFromCart} = this.props
    return (
      <div className="container">
        {cart && cart.length ? (
          <div>
            <ul className="list-group">
              <CartCheckout />
              {cart.map((cartItem, index) => {
                return (
                  <li key={cartItem.id} className="list-group-item">
                    <div className="row">
                      <div className="col-sm">
                        <img
                          src={cartItem.imageUrl}
                          className="image img-thumbnail"
                        />
                      </div>
                      <div className="col-sm">
                        <h3>{cartItem.title}</h3>
                        <span>Price: ${cartItem.price}</span>
                      </div>
                      <div className="col-sm">
                        <button
                          className="close button"
                          aria-label="Close"
                          type="button"
                          onClick={() => deleteMovieFromCart(null, index)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
              <li className="list-group-item">
                <div className="row ">
                  <div className="col-sm">
                    <span className="justify-left">
                      Total Price:{' '}
                      {cart.reduce((a, b) => {
                        return +(a + b.price)
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
    fetchCart: function() {
      return dispatch(getCartThunk())
    },
    deleteMovieFromCart: function(userId, movieId) {
      return dispatch(deleteMovieFromCart(userId, movieId))
    }
  }
}

export const GuestCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedGuestCart)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, deleteMovieFromCart} from '../store/cart'

export class DisconnectedGuestCart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const cart = this.props.cart
    console.log('the cart!', cart)
    const {deleteMovieFromCart} = this.props
    return (
      <div>
        {cart && cart.length ? (
          <div>
            {cart.map((cartItem, index) => {
              console.log(cartItem)
              return (
                <div key={cartItem.id}>
                  <h3>{cartItem.title}</h3>
                  <button
                    type="button"
                    onClick={() => deleteMovieFromCart(null, index)}
                  >
                    Remove From Cart
                  </button>
                  <img src={cartItem.imageUrl} className="img-thumbnail" />
                  <span>{cartItem.price}</span>
                </div>
              )
            })}
            <div>
              <span>
                Total Price:{' '}
                {cart.reduce((a, b) => {
                  return +(a + b.price)
                }, 0)}
              </span>
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

export const GuestCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedGuestCart)

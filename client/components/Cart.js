import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

export class DisconnectedCart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.id)
  }
  render() {
    const cart = this.props.cart
    return (
      <div>
        {cart && cart.length ? (
          <div>
            {cart.map(cartItem => {
              return (
                <div key={cartItem.movieId}>
                  <h3>{cartItem.movie.title}</h3>
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
                Total Price:{' '}
                {cart.reduce((a, b) => {
                  return +(a + b.movie.price)
                }, 0)}
              </span>
            </div>
          </div>
        ) : (
          'Loading'
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
    }
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchGuestCart} from '../store/guestCart'
export class DisconnectedGuestCart extends Component {
  componentDidMount() {
    this.props.fetchGuestCart()
  }
  render() {
    const cart = this.props.cart
    return (
      <div>
        {cart.length > 0 ? (
          <div>
            {cart.map(movie => {
              return (
                <div>
                  <h3>{movie.title}</h3>
                  <img src={movie.imageUrl} />
                  <span>{movie.price}</span>
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
          'Loading'
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.GuestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGuestCart: function() {
      return dispatch(fetchGuestCart())
    }
  }
}

export const GuestCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedGuestCart)

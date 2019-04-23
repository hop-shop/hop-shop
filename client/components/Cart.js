import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import StripeApp from './StripeApp.js'


export class DisconnectedCart extends Component {
  componentDidMount(){
    this.props.fetchCart(this.props.match.params.id)
  }
  render(){
    const cart = this.props.cart
    const userId = this.props.match.params.id
    const totalPrice = cart.reduce((a,b)=>{return +(a+b.movie.price)},0)
    return (<div>
      {cart && cart.length ?
      <div>
    {cart.map(cart=>{
        return (
        <div key={cart.movie.id}>
          <h3>{cart.movie.title}</h3>
          <img src={cart.movie.imageUrl} />
          <span>{cart.movie.price}</span>

        </div>
        )})}
        <div>
          <span>Total Price: {totalPrice}</span>
        </div>
        <div>
        <StripeApp totalPrice={totalPrice}/>
        </div>
      </div>
        :'Loading'}
        </div>)
  }
}

const mapStateToProps = state => {
  return {
    cart:state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: function(userId) {
      return dispatch(getCartThunk(userId))
    }
  }
}

export const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCart)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'


export class DisconnectedCart extends Component {
  componentDidMount(){
    this.props.fetchCart(this.props.match.params.id)
  }
  render(){
    const cart = this.props.cart
    return (<div>
      {cart && cart.length ?
    cart.map(cart=>{
        return (
        <div key={cart.userId}>
          <h3>{cart.movie.title}</h3>
          <img src={cart.movie.imageUrl} />
          <span>{cart.movie.price}</span>
        </div> )})
        :'Loading'}
        </div>)
  }
}

const mapStateToProps = state => {
  return {
    user:state.user,
    cart:state.cart.cartMovies
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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
// import {} from 'react-router-dom'


export class CartView extends Component {
componentDidMount() {
  console.log(this.props.match.params, "CATTTTTTTTT")
  const userId = this.props.match.params.userId
  const movieId = this.props.match.params.movieId
  this.props.fetchCart(userId)

}
render() {
  console.log(this.props , "PROPPPPPPPS")
  return (
    <h1>Cart View</h1>

    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
 return {
  fetchCart: function(userId) {
    return dispatch(fetchCart(userId))
  }
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartView)

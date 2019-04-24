import React, {Component} from 'react'

class CartCheckout extends Component {
  render() {
    return (
      <div className="card text-center">
        <div className="card-header">Hopflix</div>
        <div className="card-body">
          <h5 className="card-title">Your Cart</h5>
          <p className="card-text">
            Review your cart below to make changes or checkout now.
          </p>
          <a href="#" className="btn btn-primary">
            Checkout Now
          </a>
        </div>
        <div className="card-footer text-muted" />
      </div>
    )
  }
}

export default CartCheckout

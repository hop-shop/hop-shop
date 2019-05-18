import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {connect} from 'react-redux'
import axios from 'axios'
import {getCartThunk} from '../store/cart'


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ev) {
    let {user} = this.props
    let {token} = await this.props.stripe.createToken({name: user.email});
    let {data} = await axios.post(`/api/users/charge`,token)
    if (data) {
      this.setState({complete: true})
      this.props.fetchCart(this.props.user.id)
    };
  }

  render() {

    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div>
        {this.props.user.email ? <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement/>
          <button onClick={this.handleSubmit}>Send</button>
        </div>: <div>Please Log In or Sign Up</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.user,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: function(userId) {
      return dispatch(getCartThunk(userId))
    }
  }
}

export default injectStripe(connect(mapStateToProps,mapDispatchToProps)(CheckoutForm));

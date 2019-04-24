import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {connect} from 'react-redux'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {totalPrice,user} = this.props
    console.log(totalPrice)
    let {token} = await this.props.stripe.createToken({name: user.email});
    console.log(token)
    //token.price = totalPrice
    let {data} = await axios.post(`/api/users/charge`,token)
    console.log(data)
  if (data) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement/>
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    user:state.user
  }
}


export default injectStripe(connect(mapStateToProps)(CheckoutForm));

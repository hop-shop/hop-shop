import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm.js';

class StripeApp extends Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_YYPEmEOrXhmEmsF64oM509pS00AKhcwPXr')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_YYPEmEOrXhmEmsF64oM509pS00AKhcwPXr')});
      });
    }
  }
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <div className="example">
          <h3>Card Information</h3>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeApp;

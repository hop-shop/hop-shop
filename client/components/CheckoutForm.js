import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {connect} from 'react-redux'
import { sendPayment } from '../store/form';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    let {user} = this.props
    let {token} = await this.props.stripe.createToken({name: user.email});
    this.props.formStatus(token)
  }

  render() {
    const {formStatus} = this.props

    if (formStatus) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement/>
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.user,
    formStatus: state.formStatus
  }
}
const mapDispatchToProps = dispatch => {
  return {
    formStatus: function(token) {
      return dispatch(sendPayment(token))
    }
  }
}

export default injectStripe(connect(mapStateToProps,mapDispatchToProps)(CheckoutForm));

import axios from 'axios'

//action type
const PAYMENT_STATUS = 'PAYMENT_STATUS'

// actionCreator
const payment = data => ({
  type: CART_MOVIES,
  status:true
})

//Thunk

export const sendPayment = (token)=> async dispatch => {
  try {
    let {data} = await axios.post(`/api/users/charge`,token)
    dispatch(payment(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = false, action) {
  switch (action.type) {
    case PAYMENT_STATUS:
      return true
    default:
      return state
  }
}

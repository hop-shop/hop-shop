import axios from 'axios'
// import store from './index'
//action type

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'


// actionCreator

export const addcart = movie => ({
  type: ADD_TO_CART,
  movie
})

const gotCart = cart => ({
  type: GET_CART,
  cart
})

//Thunk
export const addToCartThunk = (userId, movieId) => async (dispatch) => {

  try {

    console.log('inside addToCartThunk', dispatch)
    const {data} = await axios.post(`/api/users/${userId}/cart`, movieId)
    console.log('movie object', data)
    dispatch(addcart(data))
  } catch (err) {
    console.error(err)
  }
}


export const fetchCart = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/cart`)
    console.log('cart data', data)
    dispatch(gotCart(data))

  } catch (err) {
  console.error(err)
  }
}



export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.movie]
     case GET_CART:
     return [...action.cart]
    default:
      return state
  }
}

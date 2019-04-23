import axios from 'axios'


//action type
const CART_MOVIES = 'CART_MOVIES'


// actionCreator
const getCart = cart =>({
  type:CART_MOVIES,
  cart
})


//Thunk
export const addToCartThunk = (userId, movieId) => async dispatch => {
  try {
    const{data} = await axios.post(`/api/users/${userId}/cart`, {movieId})
  } catch (err) {
    console.error(err)
  }
}

export const getCartThunk = (userId) => async dispatch =>{
  try {
    const {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

let initialstate = []

//Reducer

export default function(state = initialstate, action) {
  switch (action.type) {
    case CART_MOVIES:
    return action.cart
    default:
      return state
  }
}

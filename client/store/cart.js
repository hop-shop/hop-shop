import axios from 'axios'
import store from './index'
//action type

const ADD_TO_CART = 'ADD_TO_CART'

// actionCreator

const addcart = movie => ({
  type: ADD_TO_CART,
  movie
})

//Thunk
export const addToCartThunk = (userId, movieId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/cart`, {movieId})
    console.log('movie object', data)
    store.dispatch(addcart(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.movie]
    default:
      return state
  }
}

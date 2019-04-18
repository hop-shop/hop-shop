import axios from 'axios'
//action type

const ADD_TO_CART = 'ADD_TO_CART'

//actionCreator

const addedToCart = movie => {
  return {
    type: ADD_TO_CART,
    movie
  }
}

//Thunk
export const addToCartThunk = (userId, movieId) => async dispatch => {
  console.log('in the thunk')
  try {
    const {data} = await axios.post(`/api/users/${userId}/cart`, movieId)
    dispatch(addedToCart(data))
  } catch (err) {
    console.error(err)
  }
}

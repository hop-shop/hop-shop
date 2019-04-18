import axios from 'axios'
//action type

const ADD_TO_CART = 'ADD_TO_CART'

// actionCreator

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
    console.log('movieId', movieId)
    const {data} = await axios.post(`/api/users/${userId}/cart`, {movieId})
    console.log('this is after axios')
    dispatch(addedToCart(data))
    console.log('after dispatch')
  } catch (err) {
    console.error(err)
  }
}

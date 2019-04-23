import axios from 'axios'

//action type
const CART_MOVIES = 'CART_MOVIES'
const DELETE_MOVIE = 'DELETE_MOVIE'

// actionCreator
const getCart = cart => ({
  type: CART_MOVIES,
  cart
})

const deletedMovie = movieId => ({
  type: DELETE_MOVIE,
  movieId
})

//Thunk
export const addToCartThunk = (userId, movieId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/cart`, {movieId})
  } catch (err) {
    console.error(err)
  }
}

export const getCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteMovieFromCart = (userId, movieId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}/cart/${movieId}`)
      dispatch(deletedMovie(movieId))
    } catch (error) {
      console.error(error)
    }
  }
}

let initialstate = []

//Reducer

export default function(state = initialstate, action) {
  switch (action.type) {
    case CART_MOVIES:
      return action.cart
    case DELETE_MOVIE:
      return state.filter(cartItem => cartItem.movieId !== action.movieId)
    default:
      return state
  }
}

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
export const addToCartThunk = (user, movieId, movie) => async dispatch => {
  if (user) {
    try {
      await axios.post(`/api/users/${user.id}/cart`, {movieId})
    } catch (err) {
      console.error(err)
    }
  } else {
    try {
      console.log('here!')
      let itemsArray = localStorage.getItem('items')
        ? JSON.parse(localStorage.getItem('items'))
        : []

      itemsArray.push(movie)
      localStorage.setItem('items', JSON.stringify(itemsArray))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCartThunk = userId => async dispatch => {
  if (userId !== undefined) {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (err) {
      console.error(err)
    }
  } else {
    try {
      const data = JSON.parse(localStorage.getItem('items'))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteMovieFromCart = (userId, movieId) => {
  return async dispatch => {
    if (!userId) {
      try {
        const data = JSON.parse(localStorage.getItem('items'))
        data.splice(movieId, 1)
        localStorage.setItem('items', JSON.stringify(data))
        dispatch(getCart(data))
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        await axios.delete(`/api/users/${userId}/cart/${movieId}`)
        dispatch(deletedMovie(movieId))
      } catch (error) {
        console.error(error)
      }
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

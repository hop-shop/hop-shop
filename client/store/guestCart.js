import Axios from "axios";

//action type
const GUEST_MOVIES = 'GUEST_MOVIES'

const ADD_MOVIE = 'ADD_MOVIE'
// actionCreator
export const fetching = (data) => ({
  type: GUEST_MOVIES,
  data
})
export const added = movie => ({
  type: ADD_MOVIE,
  movie
})


//Thunk
export const addToGuestCart = (movie) => async dispatch => {
  console.log('in the thunk', movie)
  try {
    // await localStorage.setItem(movie.title, movie.id)
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
      itemsArray.push(movie)
      localStorage.setItem('items', JSON.stringify(itemsArray))
      dispatch(added(itemsArray))
    }
   catch (err) {
    console.error(err)
  }
}

export const fetchGuestCart = () => async dispatch => {
  try {
    const data = JSON.parse(localStorage.getItem('items'))
    dispatch(fetching(data))
  } catch(err) {
    console.error(err)
  }
}


let initialstate = []

//Reducer

export default function(state = initialstate, action) {
  switch (action.type) {
    case GUEST_MOVIES:
      return [...action.data]
    case ADD_MOVIE:
      return [...action.movie]
    default:
      return state
  }
}

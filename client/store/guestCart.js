//action type
const GUEST_MOVIES = 'GUEST_MOVIES'

const ADD_MOVIE = 'ADD_MOVIE'
// actionCreator
export const fetchGuestCart = () => ({
  type: GUEST_MOVIES
})
export const addToGuestCart = movie => ({
  type: ADD_MOVIE,
  movie
})

let initialstate = []

//Reducer

export default function(state = initialstate, action) {
  switch (action.type) {
    case GUEST_MOVIES:
      return [...state]
    case ADD_MOVIE:
      return [...state, action.movie]
    default:
      return state
  }
}

import axios from 'axios'

//Thunk

//action type
const ALLMOVIES = 'ALLMOVIES'

//action creator
const getAllMovies = movies => ({
  type: ALLMOVIES,
  movies
})

export const allMoviesThunk = () => async dispatch => {
  try {
    console.log('Thunk hello')
    const {data} = await axios.get('/api/movies')
    dispatch(getAllMovies(data))
  } catch (err) {
    console.error(err)
  }
}

//Reducer

export default function(state = [], action) {
  switch (action.type) {
    case ALLMOVIES:
      return [...action.movies]
    default:
      return state
  }
}

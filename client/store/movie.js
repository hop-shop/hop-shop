import axios from 'axios'


//Thunk
export const allMoviesThunk = () => async dispatch => {
  try {
    console.log("Thunk hello")
    const {data} = await axios.get('/auth/movies')
    console.log(data)
    dispatch(getAllMovies(data))
  } catch (err) {
    console.error(err)
  }
}


//action type
const ALLMOVIES = "ALLMOVIES"

//action creator
const getAllMovies = (movies)=>({
  tyep:ALLMOVIES,
  movies
})

//Reducer

export default function(state = [], action) {
  switch (action.type) {
    case ALLMOVIES:
      return [...action.movies]
    default:
      return state
  }
}

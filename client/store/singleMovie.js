import axios from 'axios'

//action type
const SINGLE_MOVIE = 'SINGLE_MOVIE'

//action creator
export const getSingleMovie = (movie) => ({
  type: SINGLE_MOVIE,
  movie
})

export const fetchMovieThunk = (id) => async dispatch => {
    try {
      // console.log('Thunk helloz')
      const {data} = await axios.get(`/api/movies/${id}`)
      dispatch(getSingleMovie(data))
    } catch (err) {
      console.error(err)
    }
  }

  export default function(state = {}, action) {
    switch(action.type) {
      case SINGLE_MOVIE:
      return {...action.movie}
      default:
      return state
    }
  }

import React from 'react'
import { connect } from 'react-redux';
import {allMoviesThunk} from '../store/movie'

class AllMovies extends React.Component
{
  componentDidMount() {
    console.log("hello component")
    this.props.fetchMovies()
  }
  render()
  {console.log('I was here')
  return (
    this.props.movies.map(movie=>{
    return (
      <div key = {movie.id}>
        <h3>{movie.title}</h3>
        <img src={movie.img}/>
        <span>{movie.price}</span>
      </div>)
    })
  )}
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: function() {
      return dispatch(allMoviesThunk());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllMovies);

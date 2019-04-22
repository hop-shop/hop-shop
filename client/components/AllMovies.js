import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allMoviesThunk} from '../store/movie'
import {Link} from 'react-router-dom'

export class DisconnectedAllMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {
    // console.log('in the component')

    return (
      <div className="container">
        {this.props.movies.map(movie => {
          return (
            <div className="card" key={movie.id}>
              <img className="card-img-top" src={movie.imageUrl} />
              <div className="card-body">
                <Link to={`movies/${movie.id}`}>
                  <h3 className="card-title">{movie.title}</h3>
                  <span className="card-text">{movie.price}</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: function() {
      return dispatch(allMoviesThunk())
    }
  }
}

export const AllMovies = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedAllMovies)

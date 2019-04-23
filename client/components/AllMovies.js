import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allMoviesThunk} from '../store/movie'
import {Link} from 'react-router-dom'
let styles1 = {
  maxWidth: '500px'
}

export class DisconnectedAllMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {
    return (
      <div className="container">
        {this.props.movies.map(movie => {
          return (
            <div
              style={styles1}
              className="card mb-3 allmovie text-dark"
              key={movie.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img className="card-img" src={movie.imageUrl} />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-dark">
                    <Link
                      style={{textDecoration: 'none'}}
                      to={`movies/${movie.id}`}
                    >
                      <h3 className="card-title text-dark">{movie.title}</h3>
                      <span className="card-text text-dark">
                        Price: ${movie.price}
                      </span>
                    </Link>
                  </div>
                  <div className="card-body">
                    <a href="#" className="btn btn-outline-primary">
                      Add to Cart
                    </a>
                  </div>
                </div>
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

export const AllMovies = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllMovies
)

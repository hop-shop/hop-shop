import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import movies from './movie'
import cart from './cart'
import singleMovie from './singleMovie'

<<<<<<< HEAD
const reducer = combineReducers({cart, user, movies, singleMovie})
=======

const reducer = combineReducers({cart, user, movies, singleMovie, GuestCart})
>>>>>>> master
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

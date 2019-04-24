import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import movies from './movie'
import cart from './cart'
import singleMovie from './singleMovie'
import GuestCart from './guestCart'
import formStatus from './form'

const reducer = combineReducers({cart, user, movies, singleMovie, GuestCart,formStatus})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

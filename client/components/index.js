/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllMovies} from './AllMovies'
export {SingleMovie} from './SingleMovie'
export {Cart} from './Cart'
export {Carousel} from './carousel'
export {GuestCart} from './GuestCart'

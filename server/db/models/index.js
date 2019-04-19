const User = require('./user')
const Movie = require('./movies')
const Cart = require('./cart')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Movie.belongsToMany(User, {through: Cart})
User.belongsToMany(Movie, {through: Cart})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: cons
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Movie,
  Cart
}

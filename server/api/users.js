const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router
//all routes are mounted to /api/users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    console.log('backend THE BODY!!!!!!!', req.body)
    const newCartItem = await Cart.create({
      userId: req.params.userId,
      movieId: req.body.movieId
    })
    res.json(newCartItem)
  } catch (err) {
    next(err)
  }
})

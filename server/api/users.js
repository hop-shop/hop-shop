const router = require('express').Router()
const {User, Cart, Movie} = require('../db/models')
const sequelize = require('sequelize')
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
    const newCartItem = await Cart.create({
      userId: req.params.userId,
      movieId: req.body.movieId
    })
    res.status(201).json(newCartItem)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId,
        purchased: false
      },
      include: [
        {
          model: Movie
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cart/:movieId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.params.userId,
        movieId: req.params.movieId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

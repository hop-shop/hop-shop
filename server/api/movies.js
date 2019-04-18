const router = require('express').Router()
const {Movie, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.findAll({})
    res.json(movies)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id)
    res.json(movie)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const newCartItem = await Cart.create({
      userId: req.body.userId,
      movieId: req.body.id
    })
    console.log('REQ.BODY---', req.body)
    res.json(newCartItem)
  } catch (err) {
    next(err)
  }
})

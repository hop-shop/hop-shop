const router = require('express').Router()
const {User, Cart, Movie} = require('../db/models')
const stripe = require("stripe")("sk_test_jXmZIDSSw86yxJkSpGwwao4G00YlkZfWkG")
const sequelize = require('sequelize')

module.exports = router
//all routes are mounted to /api/users

router.use(require("body-parser").text());

function adminUserCheck(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.sendStatus(401)
  }
}

router.get('/', adminUserCheck, async (req, res, next) => {
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

router.get('/:userId/cart', adminUserCheck, async (req, res, next) => {
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

router.post("/charge", async (req, res) => {
  try {
    console.log(req.user)

    const charge = await (req.body)
    let {status} = await stripe.charges.create({
      amount: 1000,
      currency: "usd",
      description: "Movie purchase",
      source: charge.id,
      customer:customer.id
    })

    res.json({status});
  } catch (err) {
    res.status(500).end();
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

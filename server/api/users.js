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

function totalPrice(userId){
  const cart = Cart.findAll({
    where: {
      userId: userId,
      purchased: false
    },
    include: [
      {
        model: Movie
      }
    ]
  })
  return cart.reduce((a, b) => {
    return (a + b.movie.price)
  }, 0)
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

router.post("/charge", async (req, res) => {
  try {
    const charge = await (req.body)
    let amount = await totalPrice(req.user.id)
    let customer = await stripe.customers.create(
      {email:req.user.email,
        source: charge.id})
    amount = parseInt(amount *100)
    let {status} = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      description: "Movie purchase",
      customer:customer.id
    })
    let cart = await Cart.update({
      purchased:true
    },{
      where:{userId:req.user.id}
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

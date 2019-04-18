/* global describe beforeEach it */

const { expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Movie = db.model('movie')

describe('Movie routes', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    })
  })

  describe('/api/movies/', () => {

    const movieTitle = 'Titanic'
    const moviePrice = 2.99

    beforeEach(() => {
      return Movie.create({
        title: movieTitle,
        price: moviePrice
      })
    })

    it('GET /api/movies', async () => {
      const res = await request(app)
        .get('/api/movies')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(movieTitle)
      expect(res.body[0].price).to.be.equal(moviePrice)
    })
  }) // end describe('/api/movies')
}) // end describe('Movies routes')



describe('GET `/api/movies/:id`', () => {
  const id = 2
  const movieTitle = 'it'
  const moviePrice = 4.99

  beforeEach(() => {
    return Movie.create({
      id: 2,
      title: movieTitle,
      price: moviePrice
    })
  })

  it('serves up a single Movie by its `id`', async () => {
    const res = await request(app)
      .get('/api/movies/2')
      .expect(200)


    expect(res.body.id).to.be.equal(id)
    expect(res.body.title).to.be.equal(movieTitle)
    expect(res.body.price).to.be.equal(moviePrice)
  })
})

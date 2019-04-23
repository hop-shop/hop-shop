'use strict'

const db = require('../server/db')
const {User, Movie} = require('../server/db/models')
const users = [
  {
    name: 'Kylo',
    email: 'kylo@ren.com',
    imageUrl: 'kylo.png',
    password: 'password',
    isAdmin: true
  },
  {
    name: 'Rey',
    email: 'rey@milleniumfalcon.com',
    imageUrl: 'rey.png',
    password: 'password'
  },
  {
    name: 'Finn',
    email: 'finn@resistance.com',
    imageUrl: 'finn.png',
    password: 'password'
  },
  {
    name: 'Poe',
    email: 'poe@resistance.com',
    imageUrl: 'poe.png',
    password: 'password',
    isAdmin: true
  }
]

const movies = [
  {
    id: 1,
    title: 'Lion King',
    genre: 'Animated',
    imageUrl:
      'http://www.gstatic.com/tv/thumb/movieposters/14113286/p14113286_p_v8_ac.jpg',
    price: 2.99
  },
  {
    id: 2,
    title: 'Lord of the rings',
    genre: 'Adventure,.Drama,Fantacy',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/c/c3/The_Lord_of_the_Rings_trilogy_poster.jpg',
    price: 3.99
  },
  {
    id: 3,
    title: 'it',
    genre: 'Horror',
    imageUrl:
      'http://www.gstatic.com/tv/thumb/v22vodart/13610713/p13610713_v_v8_ac.jpg',
    price: 4.99
  },
  {
    id: 4,
    title: 'Brides Maid',
    genre: 'Comedy',
    imageUrl:
      'http://www.gstatic.com/tv/thumb/v22vodart/8414185/p8414185_v_v8_ac.jpg',
    price: 1.99
  },
  {
    id: 5,
    title: 'Harry Potter',
    genre: 'Adventure,.Drama,Fantacy',
    imageUrl: 'https://timedotcom.files.wordpress.com/2014/07/301386_full1.jpg',
    price: 3.99
  }
]

async function seed() {
  try {
    await db.sync()
    console.log('db synced!')

    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      movies.map(movie => {
        return Movie.create(movie)
      })
    )
  } catch (err) {
    console.error(err)
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

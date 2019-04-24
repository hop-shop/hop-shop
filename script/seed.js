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
  },
  {
    id: 6,
    title: 'All the Presidents Men',
    genre: 'Adventure',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOWI2YWQxM2MtY2U4Yi00YjgzLTgwNzktN2ExNTgzNTIzMmUzXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg',
    price: 4.99
  },
  {
    id: 7,
    title: 'Zodiac',
    genre: 'Thriller',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,677,1000_AL_.jpg',
    price: 3.99
  },
  {
    id: 8,
    title: 'Shutter Island',
    genre: 'Thriller, Mystery',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    price: 2.99
  },
  {
    id: 9,
    title: 'Closer',
    genre: 'Drama',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BN2I0Y2JmZjQtNjEyOC00ODhkLWE5YWUtOWFkOGQwMGYyODRiXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    price: 4.99
  },
  {
    id: 10,
    title: 'Sideways',
    genre: 'Comedy',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTU0Mjg3MzkxOV5BMl5BanBnXkFtZTYwNDU1OTY3._V1_.jpg',
    price: 3.99
  },
  {
    id: 11,
    title: 'The Princess Bride',
    genre: 'Action',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjM0Nzk5NTc4OV5BMl5BanBnXkFtZTcwMDA2MzgxNA@@._V1_.jpg',
    price: 5.99
  },
  {
    id: 12,
    title: 'Lagaan',
    genre: 'International',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNDYxNWUzZmYtOGQxMC00MTdkLTkxOTctYzkyOGIwNWQxZjhmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    price: 2.99
  },
  {
    id: 13,
    title: 'Get Out',
    genre: 'Horror',
    imageUrl:
      'https://www.empirecinemas.co.uk/_uploads/film_images/7468_5460.jpg',
    price: 4.99
  },
  {
    id: 14,
    title: 'Guardians of The Galaxy',
    genre: 'Action',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51T5sJngQLL.jpg',
    price: 3.99
  },
  {
    id: 15,
    title: 'The Dark Knight',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91zBlQ1iqoL._RI_.jpg',
    price: 1.99
  },

  {
    id: 16,
    title: 'The Godfather',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61ch1vwY38L._SL1024_.jpg',
    price: 1.99
  },

  {
    id: 17,
    title: 'The Shawshank Redemption',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51B1ehfX4pL.jpg',
    price: 1.99
  },

  {
    id: 18,
    title: 'Pulp Fiction',
    genre: 'None',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    price: 1.99
  },

  {
    id: 19,
    title: 'GoodFellas',
    genre: 'None',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    price: 1.99
  },

  {
    id: 20,
    title: 'Fight Club',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71PwLE%2BJ3mL._SY679_.jpg',
    price: 1.99
  },

  {
    id: 21,
    title: 'The Shining',
    genre: 'None',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1057/4964/products/the-shining-vintage-movie-poster-original-1-sheet-27x41-7589.jpg?v=1535849247',
    price: 1.99
  },
  {
    id: 22,
    title: 'Inception',
    genre: 'None',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1416/8662/products/inception_2010_french_original_film_art_spo_2000x.jpg?v=1551890304',
    price: 1.99
  },

  {
    id: 23,
    title: 'The Breakfast Club',
    genre: 'None',
    imageUrl:
      'https://imgc.allpostersimages.com/img/print/u-g-F4T8KM0.jpg?w=550&h=550&p=0',
    price: 1.99
  },

  {
    id: 24,
    title: 'Top Gun',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51GzFq7XaML.jpg',
    price: 1.99
  },

  {
    id: 25,
    title: 'V for Vendetta',
    genre: 'None',
    imageUrl:
      'https://imgc.allpostersimages.com/img/print/posters/v-for-vendetta_a-G-8031953-0.jpg',
    price: 1.99
  },

  {
    id: 26,
    title: 'Casino',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/513wxpquZKL.jpg',
    price: 1.99
  },

  {
    id: 27,
    title: 'Dead Poets Society',
    genre: 'None',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61wfHMgTmiL._SY679_.jpg',
    price: 1.99
  },

  {
    id: 28,
    title: 'Do the Right Thing',
    genre: 'None',
    imageUrl:
      'https://img.moviepostershop.com/do-the-right-thing-movie-poster-1989-1020190485.jpg',
    price: 1.99
  }
]

async function seed() {
  try {
    await db.sync({force: true})

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

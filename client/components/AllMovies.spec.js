/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DisconnectedAllMovies} from './AllMovies'

const adapter = new Adapter()
let movies = [
  {
    id: 1,
    title: 'Titanic',
    imageUrl: 'www.image.com',
    price: 2.99
  }
]
let user = {
  id:1
}

enzyme.configure({adapter})
let fetchMovies = () => {
  return movies
}

describe('AllMovies', () => {
  let allMovies

  beforeEach(() => {
    allMovies = shallow(
      <DisconnectedAllMovies fetchMovies={fetchMovies} movies={movies} user = {user}/>
    )
  })

  it('renders the title in an h3', () => {
    expect(allMovies.find('h3').text()).to.equal('Titanic')
    expect(allMovies.find('img').prop('src')).to.equal('www.image.com')
    expect(allMovies.find('span').text()).to.equal('Price: $2.99')
  })
})

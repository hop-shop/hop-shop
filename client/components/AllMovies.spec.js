/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DisconnectedAllMovies} from './AllMovies'

const adapter = new Adapter()
let movies = [{
  id:1,
  title:'Titanic',
  price:2.99
}]

enzyme.configure({adapter})
let fetchMovies = ()=>{
  return movies
}

console.log(fetchMovies())

describe('AllMovies', () => {
  let allMovies

  beforeEach(() => {
    allMovies = shallow(<DisconnectedAllMovies fetchMovies={fetchMovies} movies = {movies}/>)
  })

  it('renders the title in an h3', () => {
    expect(allMovies.find('h3').text()).to.equal('Titanic')
  })
})

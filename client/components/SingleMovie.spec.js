/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DisconnectedSingleMovie} from './SingleMovie'

const adapter = new Adapter()
let movie = {
  id:1,
  title:'Titanic',
  imageUrl:'www.image.com',
  price:2.99
}

let user = {
  id:1,
  email:'harry@potter.com'
}

let match ={
  params:{
    id:movie.id
  }
}

enzyme.configure({adapter})
let fetchMovies = ()=>{
  return movie
}

describe('SingleMovie', () => {
  let singleMovie

  beforeEach(() => {
    singleMovie = shallow(<DisconnectedSingleMovie fetchMovieThunk={fetchMovies} movie = {movie} user={user} match={match}/>)
  })

  it('renders the title in an h3', () => {
    expect(singleMovie.find('h3').text()).to.equal('Titanic')
    expect(singleMovie.find('img').prop("src")).to.equal('www.image.com')
    expect(singleMovie.find('span').text()).to.equal('2.99')
  })
})

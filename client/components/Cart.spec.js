/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DisconnectedCart} from './Cart'

const adapter = new Adapter()
let fakeCart = [
  {
    purchased: false,
    createdAt: '2019-04-22T17:18:00.785Z',
    updatedAt: '2019-04-22T17:18:00.785Z',
    movieId: 3,
    userId: 1,
    movie: {
      id: 3,
      title: 'it',
      genre: 'Horror',
      imageUrl:
        'http://www.gstatic.com/tv/thumb/v22vodart/13610713/p13610713_v_v8_ac.jpg',
      price: 4.99,
      createdAt: '2019-04-22T16:26:24.621Z',
      updatedAt: '2019-04-22T16:26:24.621Z'
    }
  }
]

let match = {
  params: {
    id: fakeCart[0].userId
  }
}

enzyme.configure({adapter})
let fetchCart = () => {
  return fakeCart
}

describe('Cart view', () => {
  let cart

  beforeEach(() => {
    cart = shallow(
      <DisconnectedCart fetchCart={fetchCart} cart={fakeCart} match={match} />
    )
  })
  it('renders the cart', () => {
    expect(
      cart
        .find('h3')
        .first()
        .text()
    ).to.equal('it')
    expect(
      cart
        .find('img')
        .first()
        .prop('src')
    ).to.equal(
      'http://www.gstatic.com/tv/thumb/v22vodart/13610713/p13610713_v_v8_ac.jpg'
    )
    expect(
      cart
        .find('span')
        .first()
        .text()
    ).to.equal('Price: $4.99')
  })
})

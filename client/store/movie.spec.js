/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {allMoviesThunk} from './movie'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {movies:[]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('allMoviesThunk', () => {
    it('eventually dispatches the GET ALL MOVIES action', async () => {
      const fakeMovie = {
        title:'Titanic',
        price:1.99
    }
      mockAxios.onGet('/api/movies').replyOnce(200, fakeMovie)
      await store.dispatch(allMoviesThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ALLMOVIES')
      expect(actions[0].movies).to.be.deep.equal(fakeMovie)
    })
  })
})

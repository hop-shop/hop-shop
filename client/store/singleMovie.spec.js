/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchMovieThunk} from './singleMovie'
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

  const initialState = {movie:{}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchMoviesThunk', () => {
    it('eventually dispatches the GET Single MOVIES action', async () => {
      const fakeMovie = {
        id:1,
        title:'Titanic',
        price:1.99
    }
      mockAxios.onGet(`/api/movies/${fakeMovie.id}`).replyOnce(200, fakeMovie)
      await store.dispatch(fetchMovieThunk(fakeMovie.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SINGLE_MOVIE')
      expect(actions[0].movie).to.be.deep.equal(fakeMovie)
    })
  })
})

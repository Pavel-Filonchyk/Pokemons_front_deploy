import { all, put, takeEvery, call, select } from 'redux-saga/effects'
import * as actions from '../actions/getPokesDataAction'
import httpProvider from '../../common/httpProvider'

const HANDLERS = {
  *[actions.getPokesData]() {

    try {
      const { data } = yield call(httpProvider.get, 'https://pokeapi.co/api/v2/pokemon')
      yield put(actions.getPokesDataSuccess(data.results))
    } catch (error) {
      console.log(error)
    }
  },
}

export default function* sagaReducer() {
  const sagas = Object.keys(HANDLERS)
    .filter((key) => Object.prototype.hasOwnProperty.call(HANDLERS, key)) 
    .map((key) => takeEvery(key, HANDLERS[key]))

  yield all(sagas)
}
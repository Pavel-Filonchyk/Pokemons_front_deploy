import { all } from 'redux-saga/effects'

import getPokes from './getPokesSaga'
import getPokesData from './getPokesDataSaga'

export default function* staticSagas() {

  yield all([
    getPokes(),
    getPokesData()
  ])
}

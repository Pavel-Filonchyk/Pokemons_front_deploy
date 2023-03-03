import { all } from 'redux-saga/effects'

import getPokes from './getPokesSaga'
import getPokesData from './getPokesDataSaga'
import postPokes from './postLikePokesSaga'

export default function* staticSagas() {

  yield all([
    getPokes(),
    getPokesData(),
    postPokes()
  ])
}

import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import * as actions from '../actions/postLikesPokeAction'

import { POST_POKES } from '../../common/api'
import httpProvider from '../../common/httpProvider'

const HANDLERS = {
  *[actions.postLikePokes]() {
 
    const star = yield select(state => state.addStar.star)
    const oauth = yield select(state => state.postOauth.oauth)
    const collector = {pokes: star, token: oauth}
    try {
      const { data } = yield call(httpProvider.post, POST_POKES, {
        data: collector
      })
      yield put(actions.postLikePokesSuccess(data))
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

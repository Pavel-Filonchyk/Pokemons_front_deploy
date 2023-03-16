import { all, put, takeEvery, call, select } from 'redux-saga/effects'
import * as actions from '../actions/getPokesAction'

const HANDLERS = {
  *[actions.getPokes]({ payload: pokesData }) {
    function fetchData() {
      const dataMap = pokesData?.map(item => {
        return fetch(item.url)
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
            throw new Error('Something went wrong')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      return Promise.all(dataMap)
    }
    try {
      const data = yield call(fetchData)
      const pokes = data.map(item => {
        return {name: item.name, icon: item.sprites.front_default}
      })
      yield put(actions.getPokesSuccess(pokes))
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
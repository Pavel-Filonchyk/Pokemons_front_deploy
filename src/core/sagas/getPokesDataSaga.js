import { all, put, takeEvery, call, select } from 'redux-saga/effects'
import * as actions from '../actions/getPokesDataAction'

const HANDLERS = {
  *[actions.getPokesData]() {
    function fetchData() {
        return  fetch('https://pokeapi.co/api/v2/pokemon')
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
            throw new Error('Something went wrong')
          })
          .catch((error) => {
            console.log(error)
          }) 
    }
    try {
      const data = yield call(fetchData)
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
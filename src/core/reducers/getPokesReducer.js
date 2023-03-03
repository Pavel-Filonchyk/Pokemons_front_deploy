/* eslint-disable import/no-anonymous-default-export */
import * as actions from '../actions/getPokesAction'
import { getPokesDataSuccess } from '../actions/getPokesDataAction'

export const getPokes = {
  pokesData: [],
  pokes: [],
}

const HANDLERS = {
  [getPokesDataSuccess]: (state, data) => {
    return {
        ...state,
        pokesData: data,
    }  
  },
  [actions.getPokesSuccess]: (state, data) => {
    return {
        ...state,
        pokes: data,
    }  
  },
}
export default (state = getPokes, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}
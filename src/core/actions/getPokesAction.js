import { createActions } from 'redux-actions'

import * as constants from '../constants/getPokesAction'

export const { getPokes, getPokesSuccess } =
createActions(
  constants.GET_POKES,
  constants.GET_POKES_SUCCESS,
)

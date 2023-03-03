import { createActions } from 'redux-actions'

import * as constants from '../constants/getPokesDataAction'

export const { getPokesData, getPokesDataSuccess } =
createActions(
  constants.GET_POKES_DATA,
  constants.GET_POKES_DATA_SUCCESS,
)

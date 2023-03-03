import { createActions } from 'redux-actions'

import * as constants from '../constants/addStarAction'

export const { addStar, addStarSuccess } =
createActions(
  constants.ADD_STAR,
  constants.ADD_STAR_SUCCESS,
)
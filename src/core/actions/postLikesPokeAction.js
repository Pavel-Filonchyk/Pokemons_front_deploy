import { createActions } from 'redux-actions'

import * as constants from '../constants/postLikePokesAction'

export const { postLikePokes, postLikePokesSuccess } =
createActions(
  constants.POST_LIKE_POKES,
  constants.POST_LIKE_POKES_SUCCESS,
)

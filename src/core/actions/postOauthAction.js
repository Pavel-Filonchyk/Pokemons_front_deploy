import { createActions } from 'redux-actions'

import * as constants from '../constants/postOauthAction'

export const { postOauth } =
createActions(
  constants.POST_OAUTH,
 
)


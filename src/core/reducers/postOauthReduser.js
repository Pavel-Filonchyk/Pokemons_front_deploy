/* eslint-disable import/no-anonymous-default-export */
import * as actions from '../actions/postOauthAction'
export const postOauth = {
  oauth: '',
}

const HANDLERS = {
  [actions.postOauth]: (state, data) => {
    return {
        ...state,
        oauth: data.credential,
    }  
  },
}
export default (state = postOauth, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}
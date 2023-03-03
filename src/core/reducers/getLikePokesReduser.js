/* eslint-disable import/no-anonymous-default-export */
import * as actions from '../actions/postLikesPokeAction'

export const getLikePokes = {
  likePokes: []
}

const HANDLERS = {
  [actions.postLikePokesSuccess]: (state, data) => {
    return {
        ...state,
        likePokes: data,
    }  
  }
}
export default (state = getLikePokes, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}
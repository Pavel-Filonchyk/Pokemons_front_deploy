/* eslint-disable import/no-anonymous-default-export */
import * as actions from '../actions/addStarAction'

export const addStar = {
  star: [],
}

const HANDLERS = {
  [actions.addStar]: (state, data) => {
    const filter = state.star.filter(item => item.name === data.name)
    const index = state.star.findIndex(item => item.name === data.name)
    if(filter.length >= 1){
        return {
            ...state,
            star: [
              ...state.star.splice(0, index),
              ...state.star.splice(index + 1)
            ],
        }  
    }else{
        return {
            ...state,
            star: [
              ...state.star, data
            ],
        }  
    }
  },
 
}
export default (state = addStar, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}
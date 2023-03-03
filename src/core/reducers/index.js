import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import getPokes from './getPokesReducer'


export const history = createBrowserHistory()

const staticReducers = {
  router: connectRouter(history),
    getPokes
}

export default staticReducers

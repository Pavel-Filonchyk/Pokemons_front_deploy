import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import getPokes from './getPokesReducer'
import addStar from './addStarReduser'
import postOauth from './postOauthReduser'
import getLikePokes from './getLikePokesReduser'

export const history = createBrowserHistory()

const staticReducers = {
  router: connectRouter(history),
    getPokes,
    addStar,
    postOauth,
    getLikePokes
}

export default staticReducers

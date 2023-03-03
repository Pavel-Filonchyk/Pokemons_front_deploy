import { APP_CONFIG } from '../constants/config'

const {
    REACT_APP_SERVER_URL
} = APP_CONFIG

console.log(REACT_APP_SERVER_URL)
export const POST_POKES = `http://localhost:8000/pokes`

export const POST_LOGIN = `${REACT_APP_SERVER_URL}/login`
export const POST_REGISTRATION = `${REACT_APP_SERVER_URL}/registration`


export const LOGIN = `${REACT_APP_SERVER_URL}`
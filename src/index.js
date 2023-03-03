import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './core/store'
import App from './components/App/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <GoogleOAuthProvider clientId="718042417247-n755qhp2nndip2sft21ecu4mbt5e4vsi.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
  
)

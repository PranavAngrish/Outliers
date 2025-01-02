import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="1042304230770-nq9kl8isqo2uvotn824soehunrut6d17.apps.googleusercontent.com">
      <Provider store={store}>
            <App />
         </Provider>
     </GoogleOAuthProvider>
  </React.StrictMode>,
)

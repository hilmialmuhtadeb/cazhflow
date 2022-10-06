import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import Navbar from './components/layouts/Navbar'

// routing
import AppRoute from './routes'
import { BrowserRouter } from 'react-router-dom' 

// state management
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <Navbar />
        <AppRoute />
      </Provider>    
      
    </BrowserRouter>
  </React.StrictMode>
)

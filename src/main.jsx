import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './routes'

import { BrowserRouter } from 'react-router-dom' 

import './main.css'
import Navbar from './components/layouts/Navbar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <AppRoute />
    </BrowserRouter>
  </React.StrictMode>
)

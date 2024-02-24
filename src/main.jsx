import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ApiContextProvider } from './context/apiContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiContextProvider>
      <RouterProvider router={router} />
    </ApiContextProvider>
  </React.StrictMode>,
)

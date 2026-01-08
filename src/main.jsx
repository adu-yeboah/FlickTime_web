import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ApiContextProvider } from './context/apiContext'
import ThemeProvider from './context/ThemeContext'
import { WatchlistProvider } from './context/WatchlistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ApiContextProvider>
        <WatchlistProvider>
          <RouterProvider router={router} />
        </WatchlistProvider>
      </ApiContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import ThemeProvider from './context/ThemeContext'
import { WatchlistProvider } from './context/WatchlistContext'
import { HistoryProvider } from './context/HistoryContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WatchlistProvider>
          <HistoryProvider>
            <RouterProvider router={router} />
          </HistoryProvider>
        </WatchlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

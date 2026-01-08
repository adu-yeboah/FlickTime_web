import React from "react"
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('flicktime_theme') || 'dark'
    } catch (e) {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('flicktime_theme', theme)
    } catch (e) {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

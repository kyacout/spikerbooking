import React from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

import Routes from './Routes'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#d32531',
    },
    secondary: {
      main: '#000000',
    },
  },
})

export const Context = createContext({ currentUser: { id: null, email: null, current_type: null }, token: null })

const App = ({ currentUser, token }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Context.Provider value={{ currentUser, token }}>
          <Routes />
        </Context.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App

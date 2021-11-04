import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#d32531',
    },
    secondary: {
      main: '#000000',
      dark: '#212121',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
})

export const BaseLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

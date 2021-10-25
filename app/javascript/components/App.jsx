import React from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'

export const Context = createContext({ currentUser: { id: null, email: null, current_type: null }, token: null })

const App = ({ currentUser, token }) => {
  return (
    <Router>
      <Context.Provider value={{ currentUser, token }}>
        <Routes />
      </Context.Provider>
    </Router>
  )
}

export default App

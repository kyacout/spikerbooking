import React from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'

export const Context = createContext({
  currentUser: { id: null, email: null, current_type: null,
    profile_picture: null,
  },
  artistProfileId: null,
  venueProfileId: null,
  token: null,
})

const App = ({ currentUser, artistProfileId, venueProfileId, token }) => {
  return (
    <Router>
      <Context.Provider value={{ currentUser, artistProfileId, venueProfileId, token }}>
        <Routes />
      </Context.Provider>
    </Router>
  )
}

export default App

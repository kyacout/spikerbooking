import React from 'react'
import Button from '@mui/material/Button'

import { deleteReq } from '../../helpers/HTTPRequest'

export const HeaderButtons = ({ currentUser, token }) => {
  const handleLogout = () => {
    deleteReq('users/sign_out/', token)
      .then(() => window.location.replace('/'))
      .catch(e => console.error(e))
  }

  return currentUser ? (
    <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={handleLogout}
      sx={{ borderRadius: '75px', fontWeight: 'bold', textTransform: 'none', fontSize: '1.2rem' }}
    >
      Logout
    </Button>
  ) : (
    <>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={() => (window.location = '/users/sign_in')}
        sx={{ m: 'auto', borderRadius: '75px', fontWeight: 'bold', textTransform: 'none', fontSize: '1.2rem' }}
      >
        Log in
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => (window.location = '/users/sign_up')}
        sx={{ m: 'auto', borderRadius: '75px', fontWeight: 'bold', textTransform: 'none', fontSize: '1.2rem' }}
      >
        Sign up, It's Free!
      </Button>
    </>
  )
}

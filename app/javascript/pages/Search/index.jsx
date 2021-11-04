import React from 'react'
import { useContext } from 'react'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'

import styles from './styles.module.scss'
import { Context } from '../../components/App'
import { FixedBackground } from '../../layouts/FixedBackground'
import { imageURL } from '../../helpers/Cloudinary'
import { deleteReq } from '../../helpers/HTTPRequest'

export const Search = () => {
  const { currentUser, token } = useContext(Context)

  const handleLogout = () => {
    deleteReq('users/sign_out/', token)
      .then(() => window.location.replace('/'))
      .catch(e => console.error(e))
  }

  const headerButtons = currentUser ? (
    <Button color="primary" variant="contained" size="large" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <>
      <Button color="secondary" variant="contained" size="large" onClick={() => (window.location = '/users/sign_in')}>
        Log in
      </Button>
      <Button
        sx={{ ml: '25px' }}
        color="primary"
        variant="contained"
        size="large"
        onClick={() => (window.location = '/users/sign_up')}
      >
        Sign up, It's free!
      </Button>
    </>
  )
  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between" m="85px 80px 0 160px">
          <Box width="327px">
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
          </Box>
          <Box>
            <a href="/" className={styles.bold}>
              About us
            </a>
            <a href="/" className={styles.bold}>
              Contact us
            </a>
            {headerButtons}
          </Box>
        </Box>
        <div className={styles.banner}>
          <span className={styles.h1}>Easy Booking</span>
          <span className={styles.h2}>for hard-hitting talent</span>
        </div>
        <Box display="flex" flexDirection="column" width="55%" m="80px auto auto auto">
          <span className={styles.text}>Searching For Artist / Band</span>
          <OutlinedInput
            sx={{ bgcolor: 'white', borderRadius: '56px', mt: '13px' }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="City, State, or ZIP Code"
            fullWidth
          />
        </Box>
        <Box display="flex" m="auto auto 50px 160px">
          <a href="/" className={styles.text}>
            FAQs
          </a>
          <a href="/" className={styles.text}>
            Terms and conditions
          </a>
        </Box>
      </Box>
    </FixedBackground>
  )
}

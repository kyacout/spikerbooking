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
  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between" className={styles.header}>
          <Box width="327px" mr="20px">
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
          </Box>
          <Box display="flex" justifyContent="space-between" width={currentUser ? '415px' : '665px'}>
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
        <Box display="flex" flexDirection="column" className={styles.searchBarContainer}>
          <span className={styles.text}>Search for Artist / Band</span>
          <OutlinedInput
            sx={{ bgcolor: 'white', borderRadius: '56px', mt: '13px', fontSize: '1.2rem' }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ fill: 'black', width: '40px', height: '40px' }} />
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

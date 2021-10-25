import React from 'react'
import { useContext } from 'react'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import styles from './styles.module.scss'
import { Context } from '../App'
import { FixedBackground } from '../../layouts/FixedBackground'
import { imageURL } from '../../helpers/cloudinary'
import { deleteReq } from '../../helpers/requests'

const Search = () => {
  const { currentUser, token } = useContext(Context)

  const handleLogout = () => {
    deleteReq('users/sign_out/', token)
      .then(() => window.location.replace('/'))
      .catch(e => console.error(e))
  }

  const headerButtons = currentUser ? (
    <Button color="primary" variant="contained" size="large" onClick={handleLogout}>
      <span>Logout</span>
    </Button>
  ) : (
    <>
      <Button color="secondary" variant="contained" size="large" onClick={() => (window.location = '/users/sign_in')}>
        <span>Login</span>
      </Button>
      <Button
        sx={{ ml: '25px' }}
        color="primary"
        variant="contained"
        size="large"
        onClick={() => (window.location = '/users/sign_up')}
      >
        <span>Signup now It's free!</span>
      </Button>
    </>
  )
  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <div className={styles.flexContainer}>
        <div className={styles.header}>
          <div className={styles.headerItem} />
          <div className={styles.headerItem}>
            <div className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </div>
          </div>
          <div className={styles.headerItem}>{headerButtons}</div>
        </div>
        <div className={styles.navbar}>
          <a href="/" className={styles.first}>
            About us
          </a>
          <a href="/">Contact us</a>
          <a href="/">FAQs</a>
          <a href="/">Terms and conditions</a>
        </div>
        <div className={styles.banner}>
          <span className={styles.h1}>Easy Booking</span>
          <span className={styles.h2}>for hard-hitting talent</span>
        </div>
        <div className={styles.searchContainer}>
          <OutlinedInput
            sx={{ bgcolor: 'white' }}
            id="search-field"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            label="Password"
            placeholder="Location"
            fullWidth
          />
        </div>
      </div>
    </FixedBackground>
  )
}

export default Search

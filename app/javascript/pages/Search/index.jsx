import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import styles from './styles.module.scss'
import { FixedBackground } from '../../layouts/FixedBackground'
import { imageURL } from '../../helpers/Cloudinary'
import { Header } from './Header/Header'

export const Search = () => {
  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <Box className={styles.pageContainer}>
        <Header />
        <Box className={styles.banner}>
          <span className={styles.h1}>Easy Booking</span>
          <span className={styles.h2}>for hard-hitting talent</span>
        </Box>
        <Grid flexDirection="column" className={styles.searchBarContainer} mt="60px">
          <Grid item className={styles.text} m="0 auto">
            Search for Artist / Band
          </Grid>
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
        </Grid>
        <Box style={{ position: 'absolute', bottom: '30px' }}>
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

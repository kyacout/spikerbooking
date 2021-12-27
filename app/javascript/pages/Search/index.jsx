import React from 'react'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useFormik } from 'formik'

import styles from './styles.module.scss'
import { FixedBackground } from '../../layouts/FixedBackground'
import { imageURL } from '../../helpers/Cloudinary'
import { Header } from './Header/Header'

const searchTypes = ['Artist / Band', 'Venue']

export const Search = () => {
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      searchText: '',
      searchType: searchTypes[0],
    },
    onSubmit: values => {
      if (values.searchType === searchTypes[0]) {
        history.push(`/artists-search/${values.searchText}`)
      } else {
        history.push(`/venues-search/${values.searchText}`)
      }
    },
  })

  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <Box className={styles.pageContainer}>
        <Header />
        <Box className={styles.banner}>
          <span className={styles.h1}>Easy Booking</span>
          <span className={styles.h2}>for hard-hitting talent</span>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid flexDirection="column" className={styles.searchBarContainer} mt="60px">
            <Grid item className={styles.text} m="0 auto" display="flex">
              <span style={{ margin: 'auto 0' }}>Search for</span>
              <TextField
                id="search-type"
                value={formik.values.searchType}
                onChange={formik.handleChange}
                name="searchType"
                select
                sx={{ bgcolor: 'white', ml: '12px', borderRadius: '12px' }}
              >
                {searchTypes.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid flexDirection="row">
              <OutlinedInput
                name="searchText"
                placeholder="City, State, or ZIP Code"
                fullWidth
                value={formik.values.searchText}
                onChange={formik.handleChange}
                sx={{ bgcolor: 'white', borderRadius: '56px', mt: '13px', fontSize: '1.2rem' }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon style={{ fill: 'black', width: '40px', height: '40px' }} />
                  </InputAdornment>
                }
                endAdornment={
                  <Button
                    color="secondary"
                    size="large"
                    type="submit"
                    sx={{
                      m: 'auto',
                      borderRadius: '75px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                    }}
                  >
                    Search
                  </Button>
                }
              />
            </Grid>
          </Grid>
        </form>
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

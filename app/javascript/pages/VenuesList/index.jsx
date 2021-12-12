import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import map from 'lodash/map'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { VenueListContainer } from './VenueListContainer'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { Loading } from '../../components/Loading'

export const VenuesList = () => {
  const [venueProfiles, setVenueProfiles] = useState()

  useEffect(() => {
    getReq('/api/v1/venue_profiles').then(({ errors, data }) => {
      if (!errors) {
        setVenueProfiles(data)
      }
    })
  }, [])

  if (!venueProfiles) {
    return <Loading loading />
  }

  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        {`${venueProfiles.length} results`}
        <Grid container m="auto">
          {map(venueProfiles, VenueListContainer)}
        </Grid>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

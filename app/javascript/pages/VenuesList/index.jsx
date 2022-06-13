import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import map from 'lodash/map'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { VenueListContainer } from './VenueListContainer'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { Loading } from '../../components/Loading'
import { useParams } from 'react-router-dom'

export const VenuesList = () => {
  const [venueProfiles, setVenueProfiles] = useState()
  const { query } = useParams()

  useEffect(() => {
    getReq('/api/v1/venues_search', { search_venues_query: query || '' }).then(({ errors, data }) => {
      if (!errors) {
        setVenueProfiles(data)
      } else {
        console.error(errors)
      }
    })
  }, [query])

  if (!venueProfiles) {
    return (
      <FixedBackgroundHeaderFooter>
        <Loading loading />
      </FixedBackgroundHeaderFooter>
    )
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

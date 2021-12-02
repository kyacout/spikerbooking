import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import map from 'lodash/map'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { ArtistContainer } from './ArtistContainer'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { Loading } from '../../components/Loading'

export const ArtistsList = () => {
  const [artistProfiles, setArtistProfiles] = useState()

  useEffect(() => {
    getReq('/api/v1/artist_profiles').then(({ errors, data }) => {
      if (!errors) {
        setArtistProfiles(data)
      }
    })
  }, [])

  if (!artistProfiles) {
    return <Loading loading />
  }

  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        {`${artistProfiles.length} results`}
        <Grid container m="auto">
          {map(artistProfiles, ArtistContainer)}
        </Grid>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

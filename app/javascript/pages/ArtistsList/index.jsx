import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import map from 'lodash/map'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { ArtistContainer } from './ArtistContainer'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { Loading } from '../../components/Loading'
import { useParams } from 'react-router-dom'

export const ArtistsList = () => {
  const [artistProfiles, setArtistProfiles] = useState()
  const { query } = useParams()

  useEffect(() => {
    getReq('/api/v1/artists_search', { search_artists_query: query || '' }).then(({ errors, data }) => {
      if (!errors) {
        setArtistProfiles(data)
      } else {
        console.error(errors)
      }
    })
  }, [query])

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

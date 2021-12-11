import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { imageURL } from '../../helpers/Cloudinary'
import { Loading } from '../../components/Loading'

export const VenueDetails = () => {
  const [venueInfo, setVenueInfo] = useState()
  const { id } = useParams()

  useEffect(() => {
    getReq(`/api/v1/venue_profiles/${id}`).then(({ errors, data }) => {
      if (!errors) {
        setVenueInfo(data)
      }
    })
  }, [])

  if (!venueInfo) {
    return <Loading loading />
  }
  const { photo, name, description, zip_code, location, type , capacity, sound_equipment} = venueInfo

  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        <Grid container className={styles.content}>
          <Box className={styles.profileImageBox}>
            <div style={{ width: '100%' }}>
              <img
                alt="profile picture"
                src={imageURL(photo.split('image/upload/')[1])}
              />
            </div>
            <Button fullWidth variant="contained" style={{ marginTop: '16px' }}>
              Show Webs Site
            </Button>
          </Box>
          <Box className={styles.descriptionBox}>
            <p className={styles.title}>{`${name}`}</p>
            <p className={styles.venueType}>{type}</p>
            <div className={styles.text}>{description}</div>
            <div className={styles.addressBox}>
              <p>{location}<br></br>{zip_code}</p>
            </div>
          </Box>
          <Box className={styles.infoBox}>
            <p className={styles.title} style={{color:'black'}}>Venue Capacity</p>
            <p style={{fontSize: '25px'}}>{capacity}</p>
            <p className={styles.title} style={{color:'black'}}>Sound Equipment Provided</p>
            <p style={{fontSize: '25px'}}>{sound_equipment}</p>
          </Box>
        </Grid>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

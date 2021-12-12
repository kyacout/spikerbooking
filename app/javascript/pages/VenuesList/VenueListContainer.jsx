import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'

import styles from './styles.module.scss'
import { imageURL } from '../../helpers/Cloudinary'

export const VenueListContainer = ({ id, name, photo, location, capacity, zip_code }) => {
  const history = useHistory()

  return (
    <Box className={styles.venueContainer} key={id}>
      <Box className={styles.imageContainer}>
        <img
          alt="profile picture"
          src={imageURL(photo.split('image/upload/')[1], {
            width: 300,
            height: 300,
            crop: 'fill',
          })}
        />
      </Box>
      <Box className={styles.detailsContainer}>
        <div>
          <h2 className={styles.venueName}>{name}</h2>
          <p className={styles.venueLocation}>{location}</p>
          {zip_code && <p className={styles.venueLocation}>{zip_code}</p>}
          {capacity && <p className={styles.capacityText}>{`Capacity: ${capacity}`}</p>}
        </div>
        <div>
          <Button
            color="primary"
            variant="contained"
            size="small"
            sx={{ borderRadius: '75px', textTransform: 'none', width: '130px', mt: '25px' }}
            onClick={() => history.push(`/venues/${id}`)}
          >
            Show more
          </Button>
        </div>
      </Box>
    </Box>
  )
}

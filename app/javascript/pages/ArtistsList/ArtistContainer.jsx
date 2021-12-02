import React from 'react'
import Box from '@mui/material/Box'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import { useHistory } from 'react-router-dom'

import styles from './styles.module.scss'
import { imageURL } from '../../helpers/Cloudinary'
import Button from '@mui/material/Button'

export const ArtistContainer = ({ id, artist_name, location, profile_photo, zip_code }) => {
  const history = useHistory()

  return (
    <Box className={styles.artistContainer} key={id}>
      <Box className={styles.imageContainer}>
        <img
          alt="profile picture"
          src={imageURL(profile_photo.split('image/upload/')[1], {
            width: 300,
            height: 300,
            crop: 'fill',
          })}
        />
        <p className={styles.artistName}>{artist_name}</p>
        <div style={{ display: 'flex' }}>
          <LocationOnIcon height={12} />
          <span className={styles.text}>{`Musician | ${location}${zip_code && `, ${zip_code}`}`}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <MusicNoteRoundedIcon height={12} />
          <span className={styles.text}>A musician is a person who plays one or many musical instrument.</span>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ borderRadius: '75px', textTransform: 'none', width: '130px', mt: '25px' }}
          onClick={() => history.push(`artist/${id}`)}
        >
          See more
        </Button>
      </Box>
    </Box>
  )
}

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { getReq } from '../../helpers/HTTPRequest'
import styles from './styles.module.scss'
import { imageURL } from '../../helpers/Cloudinary'
import { Loading } from '../../components/Loading'

export const ArtistDetails = () => {
  const [artistInfo, setArtistInfo] = useState()
  const { id } = useParams()

  useEffect(() => {
    getReq(`/api/v1/artist_profiles/${id}`).then(({ errors, data }) => {
      if (!errors) {
        setArtistInfo(data)
      }
    })
  }, [])

  if (!artistInfo) {
    return <Loading loading />
  }

  const { profile_photo, artist_name, biography, genres, unique_statement, photos } = artistInfo

  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        <Grid container className={styles.content}>
          <Box className={styles.profileImageBox}>
            <div>
              <img
                alt="profile picture"
                src={imageURL(profile_photo.split('image/upload/')[1], {
                  width: 350,
                  height: 350,
                  crop: 'fill',
                })}
              />
            </div>
            <Button fullWidth variant="contained" style={{ marginTop: '16px' }}>
              Book Now
            </Button>
          </Box>
          <Box className={styles.biographyBox}>
            <p className={styles.title}>{`${artist_name} / Biography`}</p>
            <div className={styles.text}>{biography}</div>
          </Box>
          <Box className={styles.infoBox}>
            <p className={styles.title}>Genres</p>
            <div style={{ marginLeft: '-10px' }}>
              {genres.map(g => (
                <Chip key={g} label={g} style={{ margin: '4px 10px' }} />
              ))}
            </div>
            <p className={styles.title}>Unique Statement</p>
            <MusicNoteRoundedIcon sx={{ height: '0.6em', width: '1em' }} />
            {unique_statement}
          </Box>
          <Box className={styles.imagesBox}>
            <p className={styles.title}>Photos & Videos</p>
            {photos && (
              <ImageList variant="masonry" cols={3} gap={8} style={{ overflowX: 'scroll' }}>
                {photos.map(item => (
                  <ImageListItem key={item}>
                    <img src={imageURL(item.split('image/upload/')[1], { width: 350 })} alt="img" loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>
        </Grid>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

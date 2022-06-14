import React, { useEffect, useState } from 'react'
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

  const socialMediaIconsPath = 'v1635321933/social_media_icons/'

  const height = 300
  const width = 300

  useEffect(() => {
    getReq(`/api/v1/artist_profiles/${id}`).then(({ errors, data }) => {
      if (!errors) {
        setArtistInfo(data)
        console.log('🚀 ~ file: index.jsx ~ line 27 ~ getReq ~ data', data)
      }
    })
  }, [])

  if (!artistInfo) {
    return (
      <FixedBackgroundHeaderFooter>
        <Loading loading />
      </FixedBackgroundHeaderFooter>
    )
  }

  const {
    profile_photo,
    artist_name,
    biography,
    genres,
    unique_statement,
    photos,
    other_venue_plays,
    facebook_url,
    youtube_url,
    instagram_url,
    spotify_url,
    tiktok_url,
    twitter_url,
    apple_music_url,
    website_url,
    tidal_url,
  } = artistInfo

  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        <Grid container className={styles.content}>
          <Box className={styles.profileImageBox}>
            <div style={{ width, height }}>
              <img
                alt="profile picture"
                src={imageURL(profile_photo.split('image/upload/')[1], {
                  crop: 'fill',
                  width,
                  height,
                })}
                className={styles.profileImage}
              />
            </div>
            <Button
              variant="contained"
              style={{ marginTop: '16px', width: 300 }}
              onClick={() => (window.location = 'https://www.spikerbooking.com/contact-us')}
            >
              Book Now
            </Button>
          </Box>
          <Box className={styles.biographyBox} marginTop={0}>
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
            <div style={{ display: 'flex', height: '90px' }}>
              <MusicNoteRoundedIcon height={12} />
              <span>{unique_statement}</span>
            </div>
            <div className={styles.socialMedia}>
              {facebook_url && (
                <a href={facebook_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'facebook.svg')} alt="facebook" />
                </a>
              )}
              {instagram_url && (
                <a href={instagram_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'instagram.svg')} alt="instagram" />
                </a>
              )}
              {spotify_url && (
                <a href={spotify_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'spotify.svg')} alt="spotify" />
                </a>
              )}
              {tiktok_url && (
                <a href={tiktok_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'tiktok.svg')} alt="tiktok" />
                </a>
              )}
              {youtube_url && (
                <a href={youtube_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'youtube.svg')} alt="youtube" />
                </a>
              )}
              {tidal_url && (
                <a href={tidal_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'tidal.svg')} alt="tidal" />
                </a>
              )}
              {apple_music_url && (
                <a href={apple_music_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'apple-music.svg')} alt="apple-music" />
                </a>
              )}
              {website_url && (
                <a href={website_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'website.svg')} alt="artist-website" />
                </a>
              )}
              {twitter_url && (
                <a href={twitter_url} target="_blank" rel={'noreferrer'}>
                  <img src={imageURL(socialMediaIconsPath + 'twitter.svg')} alt="twitter" />
                </a>
              )}
            </div>
          </Box>

          <Box className={styles.socialLinksAndVenues}>
            {other_venue_plays.length > 0 && other_venue_plays[0] !== '' ? (
              <div className={styles.recentlyPlayed}>
                <p className={styles.title}>Recently Played Venues</p>
                <p className={styles.text}>{other_venue_plays.join(', ')}</p>
              </div>
            ) : (
              <div className={styles.recentlyPlayed}>
                <p className={styles.title}>Recently Played Venues</p>
                <p className={styles.text}>No venues yet ...</p>
              </div>
            )}
            {photos && (
              <div className={styles.recentlyPlayed}>
                <p className={styles.title}>Photos</p>
                <ImageList variant="quilted" cols={3} gap={10}>
                  {photos.map(item => (
                    <ImageListItem key={item}>
                      <img src={imageURL(item.split('image/upload/')[1], { height: 250 })} alt="img" loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            )}
          </Box>
        </Grid>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

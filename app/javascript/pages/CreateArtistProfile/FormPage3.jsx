import React, { useContext, useEffect, useState } from 'react'
import { TextField } from '../../components/UILibrary/TextField'

import { Context } from '../../components/App'

import styles from './styles.module.scss'
import { Box, Button } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useStore } from '../../store/store'
import { postReq, putReq } from '../../helpers/HTTPRequest'
import { DirectUpload } from 'activestorage'
import { Loading } from '../../components/Loading'
import { UploadImage } from '../../components/UILibrary/UploadImage'
const validationSchema = yup
  .object({
    photo1: yup.mixed(),
    photo2: yup.mixed(),
    photo3: yup.mixed(),
    facebook_url: yup.string().url('Enter a valid URL for your website.'),
    instagram_url: yup.string().url('Enter a valid URL for your website.'),
    tiktok_url: yup.string().url('Enter a valid URL for your website.'),
    youtube_url: yup.string().url('Enter a valid URL for your website.'),
    spotify_url: yup.string().url('Enter a valid URL for your website.'),
    tidal_url: yup.string().url('Enter a valid URL for your website.'),
    apple_music_url: yup.string().url('Enter a valid URL for your website.'),
    website_url: yup.string().url('Enter a valid URL for your website.'),
    twitter_url: yup.string().url('Enter a valid URL for your website.'),
  })
  .required()
function isValidHttpUrl(string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
export const FormPage3 = ({ visible, numOfPages, setCurPageNum, curPageNum }) => {
  const { artist } = useStore()
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { currentUser, token, artistProfileId } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState()
  const { addArtistInfo } = useStore()
  const [photoPreview, setPhotoPreview] = useState()
  const [photoPreview2, setPhotoPreview2] = useState()
  const [photoPreview3, setPhotoPreview3] = useState()

  const addPhoto = (newPhoto, name) => {
    setPhotos({ ...photos, [name]: newPhoto })
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      facebook_url: artist.facebook_url ? artist.facebook_url : '',
      instagram_url: artist.instagram_url ? artist.instagram_url : '',
      tiktok_url: artist.tiktok_url ? artist.tiktok_url : '',
      photo1: artist.photos && artist.photos[0] ? artist.photos[0] : '',
      photo2: artist.photos && artist.photos[1] ? artist.photos[1] : '',
      photo3: artist.photos && artist.photos[2] ? artist.photos[2] : '',
      youtube_url: artist.youtube_url ? artist.youtube_url : '',
      spotify_url: artist.spotify_url ? artist.spotify_url : '',
      website_url: artist.website_url ? artist.website_url : '',
      apple_music_url: artist.apple_music_url ? artist.apple_music_url : '',
      tidal_url: artist.tidal_url ? artist.tidal_url : '',
      twitter_url: artist.twitter_url ? artist.twitter_url : '',
    },
  })

  useEffect(() => {
    // if (artist.photos && isValidHttpUrl(artist.photos[0])) {
    //   setPhotoPreview(artist.photos[0])
    // }
    // if (artist.photos && isValidHttpUrl(artist.photos[1])) {
    //   setPhotoPreview2(artist.photos[1])
    // }
    // if (artist.photos && isValidHttpUrl(artist.photos[2])) {
    //   setPhotoPreview3(artist.photos[2])
    // }
    reset({
      facebook_url: artist.facebook_url ? artist.facebook_url : '',
      instagram_url: artist.instagram_url ? artist.instagram_url : '',
      tiktok_url: artist.tiktok_url ? artist.tiktok_url : '',
      youtube_url: artist.youtube_url ? artist.youtube_url : '',
      spotify_url: artist.spotify_url ? artist.spotify_url : '',
      website_url: artist.website_url ? artist.website_url : '',
      apple_music_url: artist.apple_music_url ? artist.apple_music_url : '',
      tidal_url: artist.tidal_url ? artist.tidal_url : '',
      twitter_url: artist.twitter_url ? artist.twitter_url : '',
    })
  }, [artist])

  const updateArtistRequest = values => {
    const reqCallback = ({ errors, data }) => {
      if (errors) {
        const { title, detail: message } = errors[0]
        setErrorAlert({ show: true, title, message })
      } else {
        window.location.replace(`/artists/${data.id}`)
      }
    }

    if (artistProfileId) {
      putReq(`/api/v1/artist_profiles/${artistProfileId}`, { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    } else {
      postReq('/api/v1/artist_profiles', { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    }
  }
  const checkProfilePhoto = values => {
    if (isValidHttpUrl(values.profile_photo.toString())) {
      delete values.profile_photo
      console.log(3)
      updateArtistRequest(values)
    } else {
      const upload = new DirectUpload(values.profile_photo, '/rails/active_storage/direct_uploads')
      upload.create((error, blob) => {
        if (error) {
          console.error(error)
        } else {
          updateArtistRequest({ ...values, profile_photo: blob.signed_id })
        }
      })
    }
  }
  const onFinishPhotoUpload = (data, newPhotos) => {
    delete data.photo1
    delete data.photo2
    delete data.photo3

    if (newPhotos.length > 0) {
      const values = {
        ...artist,
        other_venue_plays: artist.other_venue_plays ? artist.other_venue_plays?.split(',').map(v => v.trim()) : null,
        photos: newPhotos,
        ...data,
      }
      checkProfilePhoto(values)
    } else {
      const values = {
        ...artist,
        photos: newPhotos,
        other_venue_plays: artist.other_venue_plays ? artist.other_venue_plays?.split(',').map(v => v.trim()) : null,
        ...data,
      }
      checkProfilePhoto(values)
    }
  }
  const onSubmit = data => {
    console.log('🚀 ~ file: FormPage3.jsx ~ line 168 ~ FormPage3 ~ photos', photos)

    setLoading(true)
    const newPhotos = []
    if (photos) {
      const PhotosUrlArray = Object.values(photos)
      PhotosUrlArray.forEach((photo, index) => {
        if (photo) {
          const directUpload = new DirectUpload(photo, '/rails/active_storage/direct_uploads')

          directUpload.create(async (error, result) => {
            if (error) {
              console.log(2)
              console.error(error)
            } else {
              console.log(1)
              newPhotos.push(result.signed_id)

              if (newPhotos.length === PhotosUrlArray.length) {
                console.log(
                  '🚀 ~ file: FormPage3.jsx ~ line 146 ~ directUpload.create ~ PhotosUrlArray.length - 1',
                  PhotosUrlArray.length - 1,
                )
                onFinishPhotoUpload(data, newPhotos)
              }
            }
          })
        }
      })
    } else {
      onFinishPhotoUpload(data, newPhotos)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <>
      <Loading message="Creating profile..." loading={loading} />

      <h1>Media Info</h1>
      <span className={styles.headerText} style={{ marginBottom: '32px' }}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        {artist.photos && artist.photos[0] ? (
          <></>
        ) : (
          <UploadImage
            register={register}
            id="edit-artist-photo1"
            name="photo1"
            label="Upload photos"
            buttonLabel="Select image"
            photoPreview={photoPreview}
            setPhotoPreview={setPhotoPreview}
            required={false}
            setPhoto={addPhoto}
            errorMessage={errors.photo1?.message}
          />
        )}
        {artist.photos && artist.photos[1] ? (
          <></>
        ) : (
          <UploadImage
            register={register}
            id="edit-artist-photo2"
            name="photo2"
            label="Upload photos"
            buttonLabel="Select image"
            photoPreview={photoPreview2}
            setPhotoPreview={setPhotoPreview2}
            required={false}
            setPhoto={addPhoto}
            errorMessage={errors.photo2?.message}
          />
        )}
        {artist.photos && artist.photos[2] ? (
          <></>
        ) : (
          <UploadImage
            register={register}
            id="edit-artist-photo3"
            name="photo3"
            label="Upload photos"
            buttonLabel="Select image"
            photoPreview={photoPreview3}
            setPhotoPreview={setPhotoPreview3}
            required={false}
            setPhoto={addPhoto}
            errorMessage={errors.photo3?.message}
          />
        )}
        <Controller
          name="facebook_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-facebook_url"
              name="facebook_url"
              label="Facebook URL"
              placeholder="Enter your band's Facebook URL"
              errorMessage={errors.facebook_url?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="instagram_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-instagram_url"
              name="instagram_url"
              label="Instagram URL"
              placeholder="Enter your band's Instagram URL"
              errorMessage={errors.instagram_url?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="tiktok_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-tiktok_url"
              name="tiktok_url"
              label="Tiktok URL"
              placeholder="Enter your band's Tiktok URL"
              errorMessage={errors.tiktok_url?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="youtube_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-youtube_url"
              name="youtube_url"
              label="Youtube URL"
              placeholder="Enter your band's Youtube URL"
              errorMessage={errors.youtube_url?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="tidal_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-tidal_url"
              name="tidal_url"
              label="Tidal URL"
              placeholder="Enter your band's Tidal URL"
              errorMessage={errors.tidal_url?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="apple_music_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-apple_music_url"
              name="apple_music_url"
              label="Apple music URL"
              placeholder="Enter your band's Apple music URL"
              errorMessage={errors.apple_music_url?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="spotify_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-spotify_url"
              name="spotify_url"
              label="Spotify URL"
              placeholder="Enter your band's Spotify URL"
              errorMessage={errors.spotify_url?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="twitter_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-twitter_url"
              name="twitter_url"
              label="Twitter URL"
              placeholder="Enter your twitter URL"
              errorMessage={errors.twitter_url?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="website_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-artist_website"
              name="artist_website"
              label="Artist Website"
              placeholder="Enter your band's Website URL"
              errorMessage={errors.website_url?.message}
              {...field}
            />
          )}
        />

        <Box display="flex" justifyContent="space-between" m="32px 0 0 auto" width="100%">
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={() => setCurPageNum(curPageNum - 1)}
            sx={{ width: '120px' }}
            disabled={curPageNum === 1}
          >
            Back
          </Button>
          <span style={{ margin: 'auto' }}>Page {curPageNum} of 3</span>

          <Button type="submit" color="primary" variant="contained" size="large" sx={{ width: '120px' }}>
            submit
          </Button>
        </Box>
      </form>
    </>
  )
}

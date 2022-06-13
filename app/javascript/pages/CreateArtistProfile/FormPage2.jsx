import React, { useEffect } from 'react'
import { TextField } from '../../components/UILibrary/TextField'
import { MultiSelectInput } from '../../components/UILibrary/MultiSelectInput'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'

import styles from './styles.module.scss'
import { Box, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { useStore } from '../../store/store'

const genresList = [
  "50's",
  "60's",
  "70's",
  "80's",
  "90's",
  'Acoustic',
  'Alternative/Indie',
  'Blues',
  'Bluegrass',
  'Country',
  'Outlaw Country',
  'Christian',
  'Classical',
  'Cover Band',
  'EDM/Dance',
  'Folk',
  'Funk',
  'Fusion',
  'Heavy Metal',
  'Hip-Hop/Rap',
  'Jazz',
  'Latin',
  'Motown',
  'Party/Pop',
  'Punk',
  'R&B',
  'Reggae',
  'Rock',
  'Soul',
  'Tribute Band',
  'Open to ideas',
]
const hidden = [
  { name: 'No', value: false },
  { name: 'Yes', value: true },
]

const validationSchema = yup
  .object({
    artist_name: yup.string().required('Your artist name is required'),
    location: yup.string().required('Your location is required'),
    zip_code: yup.string().required('Your zip code is required'),
    genres: yup.array().min(1, 'You must select at least one genre').max(5, 'You can only select 5 genres'),
    unique_statement: yup.string(),
    biography: yup.string(),
    other_venue_plays: yup.string(),
    hidden: yup.string().required('Your hidden status is required'),
  })
  .required()
export const FormPage2 = ({ visible, setCurPageNum, curPageNum, numOfPages }) => {
  if (!visible) {
    return null
  }
  const { artist, addArtistInfo } = useStore()
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      artist_name: artist.artist_name ? artist.artist_name : '',
      location: artist.location ? artist.location : '',
      zip_code: artist.zip_code ? artist.zip_code : '',
      genres: artist.genres ? artist.genres : [],
      unique_statement: artist.unique_statement ? artist.unique_statement : '',
      biography: artist.biography ? artist.biography : '',
      other_venue_plays: artist.other_venue_plays ? artist.other_venue_plays.toString() : '',
      hidden: artist.hidden ? artist.hidden : hidden[0].value,
    },
  })
  useEffect(() => {
    reset({
      artist_name: artist.artist_name ? artist.artist_name : '',
      location: artist.location ? artist.location : '',
      zip_code: artist.zip_code ? artist.zip_code : '',
      genres: artist.genres ? artist.genres : [],
      unique_statement: artist.unique_statement ? artist.unique_statement : '',
      biography: artist.biography ? artist.biography : '',
      other_venue_plays: artist.other_venue_plays ? artist.other_venue_plays.toString() : '',
      hidden: artist.hidden ? artist.hidden : hidden[0].value,
    })
  }, [artist])
  const onSubmit = data => {
    addArtistInfo(data)
    setCurPageNum(curPageNum => curPageNum + 1)
  }
  return (
    <>
      <h1>Artist Profile Info</h1>
      <span className={styles.headerText} style={{ marginBottom: '32px' }}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="artist_name"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-artist_name"
              name="artist_name"
              label="Artist Name"
              placeholder="Ex: Danny Vintage"
              required
              errorMessage={errors.artist_name?.message}
              value={artist.artist_name}
              {...field}
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-location"
              name="location"
              label="Location"
              placeholder="Enter location as City, State"
              required
              errorMessage={errors.location?.message}
              value={artist.location}
              {...field}
            />
          )}
        />

        <Controller
          name="zip_code"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-zip_code"
              name="zip_code"
              label="Zip code"
              placeholder="Enter your zip code"
              required
              errorMessage={errors.zip_code?.message}
              value={artist.zip_code}
              {...field}
            />
          )}
        />
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <MultiSelectInput
              id="edit-artist-genre"
              name="genres"
              label="Genres (up to 5)"
              placeholder="Enter location as City, State"
              listItems={genresList}
              value={artist.genres}
              errorMessage={errors.genres?.message}
              required={true}
              {...field}
            />
          )}
        />

        <Controller
          name="unique_statement"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-unique_statement"
              name="unique_statement"
              label="Unique statement"
              placeholder="Enter your selling pitch, what makes you a unique live music artist"
              maxLength={150}
              errorMessage={errors.unique_statement?.message}
              value={artist.unique_statement}
              {...field}
            />
          )}
        />

        <Controller
          name="biography"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-biography"
              name="biography"
              label="Brief description"
              placeholder="Enter a brief Artist / Band bio"
              multiline
              rows={3}
              maxLength={1000}
              errorMessage={errors.biography?.message}
              value={artist.biography}
              {...field}
            />
          )}
        />
        <Controller
          name="other_venue_plays"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-other_venue_plays"
              name="other_venue_plays"
              label="Other venue plays"
              placeholder="Enter venues separated by a comma"
              multiline
              rows={2}
              errorMessage={errors.other_venue_plays?.message}
              value={artist.other_venue_plays}
              {...field}
            />
          )}
        />

        <Controller
          name="hidden"
          control={control}
          render={({ field }) => (
            <SingleSelectInput
              id="edit-artist-hidden"
              name="hidden"
              label="Hide profile"
              listItems={hidden}
              value={artist.hidden}
              required={true}
              errorMessage={errors.hidden?.message}
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
          <span style={{ margin: 'auto' }}>Page {curPageNum} of 3 </span>

          <Button color="primary" variant="contained" size="large" type="submit" sx={{ width: '120px' }}>
            Next
          </Button>
        </Box>
      </form>
    </>
  )
}

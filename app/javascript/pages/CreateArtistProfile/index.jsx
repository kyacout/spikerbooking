import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import styles from './styles.module.scss'
import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { imageURL } from '../../helpers/Cloudinary'
import { postReq } from '../../helpers/HTTPRequest'

const validationSchema = yup.object({
  name: yup.string().required("The artist's name is required"),
  location: yup.string().required('Location is required'),
  genre: yup.string().required('Genre is required'),
  unique_statement: yup.string().required('You have to enter a unique statement'),
  minimum_budget: yup.string().required('You have to enter your minimum budget'),
  website: yup.string().url('Enter a valid URL for your website.'),
})

const artistTypes = ['Solo/Duo', 'Band', 'DJ', 'Other']
const genres = [
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

export const CreateArtistProfile = ({ token }) => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      genre: [],
      unique_statement: '',
      minimum_budget: '',
      type: [],
      other_venue_plays: '',
      website: '',
      biography: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/api/v1/artist_profile', values, token, undefined)
        .then(({ errors, data }) => {
          if (errors) {
            const { title, detail: message } = errors[0]
            setErrorAlert({ show: true, title, message })
          } else {
            window.location.replace('/')
          }
        })
        .catch(e => console.error(e))
    },
  })

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1635338046/bg/artists_profile.jpg')}>
      <Box display="flex" width="100vw">
        <Box display="flex" flexDirection="column" m="58px auto auto">
          <Box display="flex">
            <Box display="flex" flexDirection="column" className={styles.formContainer}>
              <h1>Welcome to Spiker Booking Family!</h1>
              <span>
                Right On! You're now a SpikerBooking Member! The painless way to book music. Take a Few Moments to fill
                in your artist profile page. It will help the venue operator to determine if you're a good match. Don't
                worry fill in what you can now, you can always come back later.{' '}
              </span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <TextField
                  fullWidth
                  name="name"
                  label="Artist Name*:"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="location"
                  label="Location*:"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="artist-create-profile-genre">Genre (up to 5)*:</InputLabel>
                  <Select
                    labelId="artist-create-profile-genre"
                    id="artist-create-profile-genre"
                    name="genre"
                    multiple
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    error={formik.touched.genre && Boolean(formik.errors.genre)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {genres.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  name="unique_statement"
                  label="Unique statement*:"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.unique_statement && Boolean(formik.errors.unique_statement)}
                  helperText={formik.touched.unique_statement && formik.errors.unique_statement}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="minimum_budget"
                  label="Minimum budget*:"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.minimum_budget && Boolean(formik.errors.minimum_budget)}
                  helperText={formik.touched.minimum_budget && formik.errors.minimum_budget}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="artist-create-profile-type">Artist type:</InputLabel>
                  <Select
                    labelId="artist-create-profile-type"
                    id="artist-create-profile-type"
                    name="type"
                    multiple
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {artistTypes.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  name="other_venue_plays"
                  label="Other venue plays:"
                  value={formik.values.other_venue_plays}
                  onChange={formik.handleChange}
                  error={formik.touched.other_venue_plays && Boolean(formik.errors.other_venue_plays)}
                  helperText={formik.touched.other_venue_plays && formik.errors.other_venue_plays}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="website"
                  label="Website:"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="biography"
                  label="Brief description:"
                  multiline
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.biography && Boolean(formik.errors.biography)}
                  helperText={formik.touched.biography && formik.errors.biography}
                  margin="normal"
                />
                {/*<OutlinedInput*/}
                {/*  fullWidth*/}
                {/*  name="image"*/}
                {/*  accept="image/*"*/}
                {/*  type="file"*/}
                {/*  value={formik.values.image}*/}
                {/*  onChange={formik.handleChange}*/}
                {/*  error={formik.touched.image && Boolean(formik.errors.image)}*/}
                {/*  endAdornment={*/}
                {/*    <InputAdornment position="end">*/}
                {/*      <PhotoCamera />*/}
                {/*    </InputAdornment>*/}
                {/*  }*/}
                {/*/>*/}
                <div style={{ margin: '32px 0 0 auto' }}>
                  <Button color="primary" variant="contained" size="large" type="submit" disabled>
                    Finish (WIP)
                  </Button>
                </div>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import styles from './styles.module.scss'
import { FixedBackground } from '../../layouts/FixedBackground'
import { imageURL } from '../../helpers/Cloudinary'
import { postReq, getReq } from '../../helpers/HTTPRequest'

const validationSchema = yup.object({
  name: yup.string().required("The venue's name is required"),
  location: yup.string().required('Password is required'),
  venue_type: yup.string(),
  website: yup.string().url('Enter a valid URL for your website.'),
  capacity: yup.string(),
  sound_equipment: yup.string(),
  music_host_frequency: yup.string(),
  description: yup.string(),
})

const venueTypes = [
  'Bar/Restaurant',
  'Brewery/Distillery',
  'Nightclub',
  'Cafe',
  'Festival',
  'Hotel',
  'Convention Center',
  'Farmers Market',
  'Banquet Hall',
  'Other',
]

const capacities = ['<100', '101-250', '251-500', '501-1000', '1000+']

export const CreateVenueProfile = ({ token }) => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      venue_type: venueTypes[0],
      website: '',
      capacity: capacities[0],
      sound_equipment: '',
      music_host_frequency: '',
      description: '',
      photo: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/users/sign_in', { user: values }, token)
        .then(({ errors, data }) => {
          if (errors) {
            const { title, detail: message } = errors[0]
            setErrorAlert({ show: true, title, message })
          } else {
            getReq('/api/v1/user/has_profile').then(({ errors, data }) => {
              console.log({ errors, data })
              if (errors) {
                const { title, detail: message } = errors[0]
                setErrorAlert({ show: true, title, message })
              } else {
                const { profile_exists } = data
                if (profile_exists) {
                  window.location.replace('/')
                } else {
                  window.location.replace('create-venue-profile')
                }
              }
            })
          }
        })
        .catch(e => console.error(e))
    },
  })

  return (
    <FixedBackground bgImg={imageURL('v1634987955/bg/venue_profile.jpg')}>
      <div className={styles.pageContainer}>
        <div className={styles.column}>
          <div className={styles.row}>
            <a href="/" className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.formContainer}>
              <span>
                Sign in to <span className={styles.red}>Spiker Booking</span>
              </span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>Signup Failed</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <TextField
                  fullWidth
                  name="name"
                  label="Venue Name*:"
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
                <TextField
                  fullWidth
                  name="venue_type"
                  label="Venue Type:"
                  select
                  value={formik.values.venue_type}
                  onChange={formik.handleChange}
                  error={formik.touched.venue_type && Boolean(formik.errors.venue_type)}
                  helperText={formik.touched.venue_type && formik.errors.venue_type}
                  margin="normal"
                >
                  {venueTypes.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
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
                  name="capacity"
                  label="Capacity:"
                  select
                  value={formik.values.capacity}
                  onChange={formik.handleChange}
                  error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                  helperText={formik.touched.capacity && formik.errors.capacity}
                  margin="normal"
                >
                  {capacities.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="sound_equipment"
                  label="Sound Equipment Provided:"
                  value={formik.values.sound_equipment}
                  onChange={formik.handleChange}
                  error={formik.touched.sound_equipment && Boolean(formik.errors.sound_equipment)}
                  helperText={formik.touched.sound_equipment && formik.errors.sound_equipment}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="music_host_frequency"
                  label="How often do you host music?:"
                  value={formik.values.sound_equipment}
                  onChange={formik.handleChange}
                  error={formik.touched.music_host_frequency && Boolean(formik.errors.music_host_frequency)}
                  helperText={formik.touched.music_host_frequency && formik.errors.music_host_frequency}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="description"
                  label="Brief description:"
                  multiline
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  margin="normal"
                />
                <OutlinedInput
                  fullWidth
                  name="photo"
                  accept="image/*"
                  type="file"
                  value={formik.values.sound_equipment}
                  onChange={formik.handleChange}
                  error={formik.touched.music_host_frequency && Boolean(formik.errors.music_host_frequency)}
                  endAdornment={
                    <InputAdornment position="end">
                      <PhotoCamera />
                    </InputAdornment>
                  }
                />
                <div style={{ margin: '32px 0 0 auto' }}>
                  <Button color="primary" variant="contained" size="large" type="submit">
                    Finish
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

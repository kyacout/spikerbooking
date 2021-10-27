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
import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { imageURL } from '../../helpers/Cloudinary'
import { postReq } from '../../helpers/HTTPRequest'

const validationSchema = yup.object({
  name: yup.string().required("The venue's name is required"),
  location: yup.string().required('Location is required'),
  website: yup.string().url('Enter a valid URL for your website.'),
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
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/api/v1/venue_profile', values, token, undefined)
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

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1634987955/bg/venue_profile.jpg')}>
      <div className={styles.mainContent}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className={styles.formContainer}>
              <h1>Welcome to Spiker Booking Family!</h1>
              <span>
                Right On! You're now a SpikerBooking Member! The painless way to book music. Take a Few Moments to fill
                in your venue profile. It will help artist determine if you are a good match or come back later.
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
                  <Button color="primary" variant="contained" size="large" type="submit">
                    Finish
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FixedBackgroundHeaderFooter>
  )
}
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DirectUpload } from 'activestorage'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { TextField } from '../../components/UILibrary/TextField'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'
import { UploadImage } from '../../components/UILibrary/UploadImage'

import styles from './styles.module.scss'
import { Context } from '../../components/App'
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

export const CreateVenueProfile = () => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { token } = useContext(Context)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      venue_type: '',
      website: '',
      capacity: '',
      sound_equipment: '',
      music_host_frequency: '',
      description: '',
      photo: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true)
      const upload = new DirectUpload(values.photo, '/rails/active_storage/direct_uploads')
      upload.create((error, blob) => {
        if (error) {
          console.error(error)
        } else {
          postReq('/api/v1/venue_profile', { ...values, photo: blob.signed_id }, token)
            .then(({ errors, _data }) => {
              setLoading(false)
              if (errors) {
                const { title, detail: message } = errors[0]
                setErrorAlert({ show: true, title, message })
              } else {
                window.location.replace('/')
              }
            })
            .catch(e => console.error(e))
        }
      })
    },
  })

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1634987955/bg/venue_profile.jpg')}>
      <Backdrop
        sx={{ display: 'flex', flexDirection: 'column', color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
        Creating Profile ...
      </Backdrop>
      <Box display="flex" width="100vw">
        <Box display="flex" flexDirection="column" m="58px auto auto">
          <Box display="flex">
            <Box display="flex" flexDirection="column" className={styles.formContainer}>
              <h1>Welcome to Spiker Booking Family!</h1>
              <span>
                Right On! You're now a Spiker Booking Member! The painless way to book music. Take a Few Moments to fill
                in your venue profile. It will help artist determine if you are a good match or come back later.
              </span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show} sx={{ mt: '24px', mb: '24px' }}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <TextField formik={formik} id="edit-venue-name" name="name" label="Venue Name" required />
                <TextField formik={formik} id="edit-venue-location" name="location" label="Location" required />
                <SingleSelectInput
                  id="edit-venue-type"
                  formik={formik}
                  name="venue_type"
                  label="Venue Type"
                  listItems={venueTypes}
                />
                <TextField formik={formik} id="edit-venue-website" name="website" label="Website" />
                <SingleSelectInput
                  formik={formik}
                  id="edit-venue-capacity"
                  name="capacity"
                  label="Capacity"
                  listItems={capacities}
                />
                <TextField
                  formik={formik}
                  id="edit-venue-sound_equipment"
                  name="sound_equipment"
                  label="Sound Equipments Provided"
                />
                <TextField
                  formik={formik}
                  id="edit-venue-music_host_frequency"
                  name="music_host_frequency"
                  label="How often do you host music?"
                />
                <UploadImage
                  formik={formik}
                  id="edit-venue-photo"
                  name="photo"
                  label="Upload photo"
                  buttonLabel="Select image"
                />
                <TextField formik={formik} id="edit-venue-description" name="description" label="Brief description" />
                <div style={{ margin: '32px 0 0 auto' }}>
                  <Button color="primary" variant="contained" size="large" type="submit">
                    Finish
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

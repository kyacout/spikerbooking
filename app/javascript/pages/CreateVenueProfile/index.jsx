import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DirectUpload } from 'activestorage'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

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
  const [photoPreview, setPhotoPreview] = useState()
  const [loading, setLoading] = useState(false)

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
                Right On! You're now a SpikerBooking Member! The painless way to book music. Take a Few Moments to fill
                in your venue profile. It will help artist determine if you are a good match or come back later.
              </span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show} sx={{ mt: '24px', mb: '24px' }}>
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
                <Box display="flex" textAlign="center" justifyContent="space-between" mt="16px">
                  <Avatar size="md" src={photoPreview} sx={{ height: '80px', width: '80px' }}>
                    <InsertPhotoIcon />
                  </Avatar>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ m: 'auto 0 auto 20px' }}
                    size="large"
                  >
                    Choose a picture for your venue
                    <input
                      name="photo"
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={e => {
                        formik.setFieldValue('photo', e.target.files[0])
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setPhotoPreview(fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(e.target.files[0])
                      }}
                    />
                  </Button>
                </Box>
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

import React, { useContext, useState , useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DirectUpload } from 'activestorage'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'

import styles from './styles.module.scss'
import { Context } from '../../components/App'
import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { imageURL } from '../../helpers/Cloudinary'
import { putReq, postReq } from '../../helpers/HTTPRequest'
import { TextField } from '../../components/UILibrary/TextField'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'
import { UploadImage } from '../../components/UILibrary/UploadImage'
import { Loading } from '../../components/Loading'
import { string } from 'prop-types'


const validationSchema = yup.object({
  // name: yup.string().required("The venue's name is required"),
  // photo: yup.string().required('Your profile photo is required'),
  // location: yup.string().required('Location is required'),
  // website: yup.string().url('Enter a valid URL for your website.'),
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

export const CreateVenueProfile = ({
  name = '',
  location = '',
  venue_type,
  website = '',
  capacity,
  sound_equipment = '',
  host_music_frequency = '',
  description = '',
  photo,
}) => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { token, venueProfileId } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState()
  const profilePhotoExists = !!photo
  const count = 1;
  useEffect(()=>{
    if(profilePhotoExists){
      setPhotoPreview(photo)
    }  
  },[count])
  


  const updateVenueRequest = values => {
    const reqCallback = ({ errors, data }) => {
      setLoading(false)
      if (errors) {
        const { title, detail: message } = errors[0]
        setErrorAlert({ show: true, title, message })
      } else {
        window.location.replace(`/venues/${data.id}`)
      }
    }

    if (venueProfileId) {
      putReq(`/api/v1/venue_profiles/${venueProfileId}`, { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    } else {
      postReq('/api/v1/venue_profiles', { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    }
  }

  const formik = useFormik({
    initialValues: {
      name,
      location: string,
      venue_type: venue_type || venueTypes[0],
      website,
      capacity: capacity || capacities[0],
      sound_equipment,
      host_music_frequency,
      description,
      photo,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true)

      if (profilePhotoExists) {
        if(values.photo==photo){
          updateVenueRequest({ ...values, photo: undefined })
        }else{
          const upload = new DirectUpload(values.photo, '/rails/active_storage/direct_uploads')
          upload.create((error, blob) => {
          if (error) {
            console.error(error)
          } else {
            updateVenueRequest({ ...values, photo: blob.signed_id })
          }
        })
        }
        
      } else {
        const upload = new DirectUpload(values.photo, '/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
          if (error) {
            console.error(error)
          } else {
            updateVenueRequest({ ...values, photo: blob.signed_id })
          }
        })
      }
    },
  })
  console.log(formik.initialValues.location)

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1634987955/bg/venue_profile.jpg')}>
      <Loading message="Creating profile..." loading={loading} />
      <Box display="flex" width="100vw">
        <Box display="flex" flexDirection="column" m="58px auto auto">
          <Box display="flex">
            <Box display="flex" flexDirection="column" className={styles.formContainer}>
              <h1>Welcome to Spiker Booking Family!</h1>
              <span className={styles.headerText}>
                Right On! You&apos;re now a Spiker Booking Member! The painless way to book music. Take a Few Moments to
                fill in your venue profile. It will help artist determine if you are a good match or come back later.
              </span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show} sx={{ mt: '24px', mb: '24px' }}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <TextField
                  formik={formik}
                  id="edit-venue-name"
                  name="name"
                  label="Venue Name"
                  placeholder="Venue Name"
                  required
                />
                <TextField
                  formik={formik}
                  id="edit-venue-location"
                  name="location"
                  label="Location"
                  placeholder="State, City"
                  required
                />
                <SingleSelectInput
                  formik={formik}
                  id="edit-venue-type"
                  name="venue_type"
                  label="Venue Type"
                  listItems={venueTypes}
                />
                <TextField
                  formik={formik}
                  id="edit-venue-website"
                  name="website"
                  placeholder="Website"
                  label="Website"
                />
                <SingleSelectInput
                  formik={formik}
                  id="edit-venue-capacity"
                  name="capacity"
                  label="Capacity"
                  listItems={capacities}
                  placeholder="Venue type"
                />
                <TextField
                  formik={formik}
                  id="edit-venue-sound_equipment"
                  name="sound_equipment"
                  label="Sound Equipments Provided"
                />
                <TextField
                  formik={formik}
                  id="edit-venue-host_music_frequency"
                  name="host_music_frequency"
                  label="How often do you host music?"
                  placeholder="Hosting frequency"
                />
                {!profilePhotoExists && (
                  <UploadImage
                    formik={formik}
                    id="edit-venue-photo"
                    name="photo"
                    label="Upload photo"
                    buttonLabel="Select image"
                    photoPreview={photoPreview}
                    setPhotoPreview={setPhotoPreview}
                  />
                )}
                {profilePhotoExists && (
                  <UploadImage
                    formik={formik}
                    id="edit-venue-photo"
                    name="photo"
                    label="Upload photo"
                    buttonLabel="Select image"
                    photoPreview={photoPreview}
                    setPhotoPreview={setPhotoPreview}
                  />
                )}
                <TextField
                  formik={formik}
                  id="edit-venue-description"
                  name="description"
                  placeholder="Tell us more about your venue"
                  label="Brief description"
                />
                <div style={{ margin: '32px 0 0 auto' }}>
                  <Button color="primary" variant="contained" size="large" type="submit">
                    Submit
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

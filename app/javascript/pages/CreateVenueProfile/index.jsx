import React, { useContext, useState, useEffect, useMemo } from 'react'
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
import { useStore } from '../../store/store'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
  name: yup.string().required("The venue's name is required"),
  photo: yup.mixed().test('required', 'photo is required', value => value.length > 0),
  location: yup.string().required('Location is required'),
  website: yup.string().url('Enter a valid URL for your website.'),
  venue_type: yup.string().required('Venue type is required'),
  capacity: yup.string().required(),
  sound_equipment: yup.string(),
  host_music_frequency: yup.string(),
  description: yup.string(),
  hidden: yup.boolean().required('Your hidden status is required'),
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
const hidden_options = [
  { name: 'No', value: false },
  { name: 'Yes', value: true },
]

const capacities = ['<100', '101-250', '251-500', '501-1000', '1000+']
function isValidHttpUrl(string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
export const CreateVenueProfile = () => {
  const { venue, addVenueInfo } = useStore()
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { token, venueProfileId } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState()
  const [profilePhotoExist, setProfilePhotoExist] = useState(false)
  const [photo, setPhoto] = useState()
  const count = 1

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(
      () => ({
        name: venue.name,
        photo: venue.photo,
        location: venue.location,
        website: venue.website,
        capacity: venue.capacity ? capacities.filter(option => option === venue.capacity)[0] : '',
        sound_equipment: venue.sound_equipment,
        host_music_frequency: venue.host_music_frequency,
        description: venue.description,
        hidden: venue.hidden ? hidden_options.filter(option => option.value === venue.hidden)[0].value : false,
        venue_type: venue.venue_type ? venueTypes.filter(option => option === venue.venue_type)[0] : '',
      }),
      [venue],
    ),
  })
  useEffect(() => {
    reset({
      name: venue.name ? venue.name : '',
      photo: venue.photo ? venue.photo : '',
      location: venue.location ? venue.location : '',
      website: venue.website ? venue.website : '',
      capacity: venue.capacity ? capacities.filter(option => option === venue.capacity)[0] : '',
      sound_equipment: venue.sound_equipment ? venue.sound_equipment : '',
      host_music_frequency: venue.host_music_frequency ? venue.host_music_frequency : '',
      description: venue.description ? venue.description : '',
      hidden: venue.hidden ? hidden_options.filter(option => option.value === venue.hidden)[0].value : false,
      venue_type: venue.venue_type ? venueTypes.filter(option => option === venue.venue_type)[0] : '',
    })
    if (isValidHttpUrl(venue.photo)) {
      setProfilePhotoExist(true)
      setPhotoPreview(venue.photo)
    }
  }, [venue])

  const updateVenueRequest = values => {
    console.log(9)
    const reqCallback = ({ errors, data }) => {
      console.log(10)
      setLoading(false)
      if (errors) {
        console.log(11)
        const { title, detail: message } = errors[0]
        setErrorAlert({ show: true, title, message })
      } else {
        console.log(12)
        window.location.replace(`/venues/${data.id}`)
      }
      console.log(13)
    }

    if (venueProfileId) {
      console.log(14)
      putReq(`/api/v1/venue_profiles/${venueProfileId}`, { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    } else {
      console.log(15)
      postReq('/api/v1/venue_profiles', { ...values }, token)
        .then(reqCallback)
        .catch(e => console.error(e))
    }
    console.log(16)
  }

  const onSubmit = data => {
    setLoading(true)
    console.log('🚀 ~ file: index.jsx ~ line 124 ~ CreateVenueProfile ~ data.photo', data.photo)
    if (photo) {
      data.photo = photo
    }

    if (isValidHttpUrl(data.photo)) {
      console.log(1)
      updateVenueRequest({ ...data, photo: undefined })
    } else {
      console.log(5)
      const upload = new DirectUpload(data.photo, '/rails/active_storage/direct_uploads')
      upload.create((error, blob) => {
        console.log(7)
        if (error) {
          console.error(error)
        } else {
          console.log(7)
          updateVenueRequest({ ...data, photo: blob.signed_id })
        }
      })
      console.log(8)
    }
  }
  if (!venue) return <Loading message="Loading profile..." loading={true} />

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
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Collapse in={errorAlert.show} sx={{ mt: '24px', mb: '24px' }}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-name"
                      name="name"
                      label="Venue Name"
                      placeholder="Venue Name"
                      required
                      errorMessage={errors.name?.message}
                      value={venue.name}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-location"
                      name="location"
                      label="Location"
                      placeholder="State, City"
                      required
                      errorMessage={errors.location?.message}
                      value={venue.location}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="venue_type"
                  control={control}
                  render={({ field }) => (
                    <SingleSelectInput
                      id="edit-venue-type"
                      name="venue_type"
                      label="Venue Type"
                      listItems={venueTypes}
                      value={venue.venue_type}
                      required={true}
                      errorMessage={errors.venue_type?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-website"
                      name="website"
                      placeholder="Website"
                      label="Website"
                      errorMessage={errors.website?.message}
                      value={venue.website}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="capacity"
                  control={control}
                  render={({ field }) => (
                    <SingleSelectInput
                      id="edit-venue-capacity"
                      name="capacity"
                      label="Capacity"
                      listItems={capacities}
                      placeholder="Capacity"
                      value={venue.capacity}
                      required={true}
                      errorMessage={errors.capacity?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="sound_equipment"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-sound_equipment"
                      name="sound_equipment"
                      label="Sound Equipments Provided"
                      errorMessage={errors.sound_equipment?.message}
                      value={venue.sound_equipment}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="host_music_frequency"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-host_music_frequency"
                      name="host_music_frequency"
                      label="How often do you host music?"
                      placeholder="Hosting frequency"
                      errorMessage={errors.host_music_frequency?.message}
                      value={venue.host_music_frequency}
                      {...field}
                    />
                  )}
                />
                {/* {!profilePhotoExist && (
                  <UploadImage
                    register={register}
                    id="edit-venue-photo"
                    name="photo"
                    label="Upload photo"
                    buttonLabel="Select image"
                    photoPreview={photoPreview}
                    setPhotoPreview={setPhotoPreview}
                    required={true}
                    value={venue.photo}
                    errorMessage={errors.photo?.message}
                  />
                )} */}
                <UploadImage
                  register={register}
                  id="edit-venue-photo"
                  name="photo"
                  label="Upload photo"
                  buttonLabel="Select image"
                  photoPreview={photoPreview}
                  setPhotoPreview={setPhotoPreview}
                  required={true}
                  value={venue.photo}
                  errorMessage={errors.photo?.message}
                  setPhoto={setPhoto}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="edit-venue-description"
                      name="description"
                      placeholder="Tell us more about your venue"
                      label="Brief description"
                      multiline
                      rows={3}
                      maxLength={1000}
                      errorMessage={errors.description?.message}
                      value={venue.description}
                      {...field}
                    />
                  )}
                />

                {/* <Controller
                  name="hidden"
                  control={control}
                  render={({ field }) => (
                    <SingleSelectInput
                      id="edit-venue-hidden"
                      name="hidden"
                      label="Hide profile"
                      listItems={hidden_options}
                      value={venue.hidden}
                      required={true}
                      errorMessage={errors.hidden?.message}
                      {...field}
                    />
                  )}
                /> */}

                <Controller
                  name="hidden"
                  control={control}
                  render={({ field }) => (
                    <SingleSelectInput
                      id="edit-venue-hidden"
                      name="hidden"
                      label="Hide profile"
                      listItems={hidden_options}
                      value={venue.hidden}
                      required={true}
                      errorMessage={errors.hidden?.message}
                      {...field}
                    />
                  )}
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

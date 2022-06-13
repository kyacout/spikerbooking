import React, { useState, useEffect, useMemo } from 'react'
import { TextField } from '../../components/UILibrary/TextField'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'
import { UploadImage } from '../../components/UILibrary/UploadImage'

import styles from './styles.module.scss'
import { Box, Button } from '@mui/material'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStore } from '../../store/store'

const budgetRanges = ['$100 - $199', '$200 - $299', '$300 - $499', '$500 - $999', '$1,000+']
const validationSchema = yup
  .object({
    first_name: yup.string().required('Your first name is required'),
    last_name: yup.string().required('Your last name is required'),
    phone: yup.string().required('Your phone number is required'),
    minimum_budget: yup.string().required('Your minimum budget is required'),
    profile_photo: yup.mixed().test('required', 'photo is required', value => value.length > 0),
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
export const FormPage1 = ({ setCurPageNum, curPageNum, numOfPages, visible, email }) => {
  const [photoPreview, setPhotoPreview] = useState()
  const [photo, setPhoto] = useState()

  const { artist, addArtistInfo } = useStore()

  const addPhoto = (photo, name) => {
    setPhoto(photo)
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: artist.first_name || '',
      last_name: artist.last_name || '',
      phone: artist.phone || '',
      profile_photo: artist.profile_photo || '',
      minimum_budget: artist.minimum_budget ? budgetRanges.filter(option => option === artist.minimum_budget)[0] : '',
    },
  })
  useEffect(() => {
    if (isValidHttpUrl(artist.profile_photo)) {
      setPhotoPreview(artist.profile_photo)
    }
    reset({
      first_name: artist.first_name || '',
      last_name: artist.last_name || '',
      profile_photo: artist.profile_photo,
      phone: artist.phone || '',
      minimum_budget: artist.minimum_budget ? budgetRanges.filter(option => option === artist.minimum_budget)[0] : '',
    })
  }, [artist])
  const onSubmit = data => {
    console.log('🚀 ~ file: FormPage1.jsx ~ line 81 ~ FormPage1 ~ artist', artist)

    if (photo) {
      data.profile_photo = photo
    }

    addArtistInfo(data)
    setCurPageNum(curPageNum => curPageNum + 1)
  }

  if (!visible) {
    return null
  }

  return (
    <>
      <h1>Account Profile</h1>
      <span className={styles.headerText}>
        Hello <b>{email}</b> welcome to Spiker Booking. Please fill out your account profile details.
      </span>
      <span style={{ margin: '20px auto 32px 12px', textAlign: 'left' }}>
        Note: This information is private. It will not be shared publicly
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-first_name"
              name="first_name"
              label="First Name"
              placeholder="Ex: Jane"
              required
              value={artist.first_name}
              errorMessage={errors.first_name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-last_name"
              name="last_name"
              label="Last Name"
              placeholder="Ex: Doe"
              required={true}
              value={artist.last_name}
              errorMessage={errors.last_name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              id="edit-artist-phone"
              name="phone"
              label="Phone Number"
              placeholder="Use format (555) 555-5555"
              required={true}
              errorMessage={errors.phone?.message}
              value={artist.phone}
              {...field}
            />
          )}
        />

        <UploadImage
          register={register}
          id="edit-artist-profile_photo"
          name="profile_photo"
          label="Upload profile picture"
          buttonLabel="Select image"
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          required={true}
          setPhoto={addPhoto}
          errorMessage={errors.profile_photo?.message}
        />

        <Controller
          name="minimum_budget"
          control={control}
          render={({ field }) => (
            <SingleSelectInput
              id="edit-artist-minimum_budget"
              name="minimum_budget"
              label="Minimum budget"
              listItems={budgetRanges}
              required={true}
              errorMessage={errors.minimum_budget?.message}
              value={artist.minimum_budget}
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

          <Button color="primary" variant="contained" size="large" type="submit" sx={{ width: '120px' }}>
            Next
          </Button>
        </Box>
      </form>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { TextField } from '../../components/UILibrary/TextField'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'
import { UploadImage } from '../../components/UILibrary/UploadImage'

import styles from './styles.module.scss'

const budgetRanges = ['$100 - $199', '$200 - $299', '$300 - $499', '$500 - $999', '$1,000+']

export const FormPage1 = ({ formik, email, visible, profilePhotoExists, profile_photo }) => {
  const [photoPreview, setPhotoPreview] = useState()
  const count = 1

  useEffect(() => {
    if (profilePhotoExists) {
      setPhotoPreview(profile_photo)
    }
  }, [count])

  if (!visible) {
    return null
  } //const profilePhotoExists = !!profile_photo

  return (
    <>
      <h1>Account Profile</h1>
      <span className={styles.headerText}>
        Hello <b>{email}</b> welcome to Spiker Booking. Please fill out your account profile details.
      </span>
      <span style={{ margin: '20px auto 32px 12px', textAlign: 'left' }}>
        Note: This information is private. It will not be shared publicly
      </span>
      <TextField
        formik={formik}
        id="edit-artist-first_name"
        name="first_name"
        label="First Name"
        placeholder="Ex: Jane"
        required
      />
      <TextField
        formik={formik}
        id="edit-artist-last_name"
        name="last_name"
        label="Last Name"
        placeholder="Ex: Doe"
        required
      />
      <TextField
        formik={formik}
        id="edit-artist-phone"
        name="phone"
        label="Phone Number"
        placeholder="Use format (555) 555-5555"
        required
      />
      {!profilePhotoExists && (
        <UploadImage
          formik={formik}
          id="edit-artist-profile_photo"
          name="profile_photo"
          label="Upload profile picture"
          buttonLabel="Select image"
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
        />
      )}
      {profilePhotoExists && (
        <UploadImage
          formik={formik}
          id="edit-artist-profile_photo"
          name="profile_photo"
          label="Upload profile picture"
          buttonLabel="Select image"
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
        />
      )}
      <SingleSelectInput
        formik={formik}
        id="edit-artist-minimum_budget"
        name="minimum_budget"
        label="Minimum budget"
        listItems={budgetRanges}
        required
      />
    </>
  )
}

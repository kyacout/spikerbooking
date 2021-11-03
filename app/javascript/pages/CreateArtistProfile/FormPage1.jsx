import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import styles from './styles.module.scss'

const budgetRanges = ['$100 - $199', '$200 - $299', '$300 - $499', '$500 - $999', '$1,000+']

export const FormPage1 = ({ formik, email }) => {
  const [profilePicturePreview, setProfilePicturePreview] = useState()

  return (
    <>
      <h1>Account Profile</h1>
      <span className={styles.headerText}>
        Hello <b>{email}</b> welcome to Spiker Booking. Please fill out your account profile details.
      </span>
      <span style={{ marginTop: '20px', textAlign: 'left' }}>
        Note: This information is private. It will not be shared publicly
      </span>
      <TextField
        fullWidth
        name="full_name"
        label="Full Name*:"
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={formik.touched.full_name && Boolean(formik.errors.full_name)}
        helperText={formik.touched.full_name && formik.errors.full_name}
        margin="normal"
        placeholder="Ex: Jane Doe"
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone Number*:"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        margin="normal"
        placeholder="Use format (555) 555-5555"
      />
      <Box display="flex" textAlign="center" justifyContent="space-between" mt="16px" mb="8px">
        <Avatar size="md" src={profilePicturePreview} sx={{ height: '80px', width: '80px' }} />
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px' }}
          size="large"
        >
          Choose profile picture
          <input
            name="profile_picture"
            accept="image/*"
            type="file"
            hidden
            onChange={e => {
              formik.setFieldValue('profile_picture', e.target.files[0])
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setProfilePicturePreview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
      </Box>
      <TextField
        fullWidth
        name="minimum_budget"
        label="Minimum budget*:"
        select
        value={formik.values.minimum_budget}
        onChange={formik.handleChange}
        error={formik.touched.minimum_budget && Boolean(formik.errors.minimum_budget)}
        helperText={formik.touched.minimum_budget && formik.errors.minimum_budget}
        margin="normal"
      >
        {budgetRanges.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  )
}

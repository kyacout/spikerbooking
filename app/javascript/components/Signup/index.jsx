import React, { useState } from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'

import { FixedBackground } from '../../layout/FixedBackground'
import styles from './styles.module.scss'
import { imageURL } from '../../helpers/cloudinary'
import { postReq } from '../../helpers/requests'

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirm_password: yup.string('Enter your password again').oneOf([yup.ref('password'), null], 'Passwords must match'),
  current_type: yup.string('Please choose your account type').required('Account type is required'),
})

const userTypes = [
  { value: 'artist', label: 'Artist' },
  { value: 'venue', label: 'Venue' },
]

const Signup = ({ token }) => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      current_type: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/users', { user: values }, token)
        .then(() => window.location.replace('/'))
        .catch(e => console.log(e))
    },
  })

  return (
    <FixedBackground bgImg={imageURL('v1634803101/bg/signup.jpg')}>
      <div className={styles.pageContainer}>
        <div className={styles.column}>
          <div className={styles.row}>
            <a href="/" className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.signupFormContainer}>
              <span className={styles.formHeading}>Join Spiker Booking</span>
              <span className={clsx(styles.formHeading, styles.red)}>It's Free!</span>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <Collapse in={errorAlert.show}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                    <AlertTitle>Signup Failed</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="current_type"
                  name="current_type"
                  label="Are you joining as an"
                  select
                  value={formik.values.current_type}
                  onChange={formik.handleChange}
                  error={formik.touched.current_type && Boolean(formik.errors.current_type)}
                  helperText={formik.touched.current_type && formik.errors.current_type}
                  margin="normal"
                >
                  {userTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button color="primary" variant="contained" fullWidth size="large" type="submit" sx={{ mt: '32px' }}>
                  Join Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

export default Signup

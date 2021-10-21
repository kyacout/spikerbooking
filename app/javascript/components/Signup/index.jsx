import React from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import { FixedBackground } from '../../layout/FixedBackground'
import styles from './styles.module.scss'
import { imageURL } from '../../helpers/cloudinary'

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup.string('Enter your password again').oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const userTypes = [
  { value: 'artist', label: 'Artist' },
  { value: 'venue', label: 'Venue' },
]

const Signup = ({ token }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userType: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
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
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="userType"
                  name="userType"
                  label="Are you joining as an"
                  select
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                >
                  {userTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button color="primary" variant="contained" fullWidth size="large" type="submit" mt="32">
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

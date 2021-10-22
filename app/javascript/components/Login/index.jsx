import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { FixedBackground } from '../../layout/FixedBackground'
import { imageURL } from '../../helpers/cloudinary'
import { postReq } from '../../helpers/requests'

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

const Login = ({ token }) => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/users/sign_in', { user: values }, token)
        .then(() => window.location.replace('/'))
        .catch(e => console.log(e))
    },
  })
  return (
    <FixedBackground bgImg={imageURL('v1634803101/bg/login.jpg')}>
      <div className={styles.pageContainer}>
        <div className={styles.column}>
          <div className={styles.row}>
            <a href="/" className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.signupFormContainer}>
              <span>
                Sign in to <span className={styles.red}>Spiker Booking</span>
              </span>
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
                <Button color="primary" variant="contained" fullWidth size="large" type="submit" sx={{ mt: '32px' }}>
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

export default Login

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { FixedBackground } from '../../../layouts/FixedBackground'
import { imageURL } from '../../../helpers/Cloudinary'
import { postReq } from '../../../helpers/HTTPRequest'
import { postAuthentication } from '../../../helpers/Devise'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

const Login = ({ token }) => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/users/sign_in', { user: values }, token)
        .then(({ errors, data }) => {
          if (errors) {
            const { title, detail: message } = errors[0]
            setErrorAlert({ show: true, title, message })
          } else {
            postAuthentication(data.attributes.current_type)
          }
        })
        .catch(e => console.error(e))
    },
  })

  return (
    <FixedBackground bgImg={imageURL('v1634803101/bg/login.jpg')}>
      <div className={styles.mainContent}>
        <div className={styles.column}>
          <div className={styles.row}>
            <a href="/" className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.loginFormContainer}>
              <span>
                Sign in to <span className={styles.red}>Spiker Booking</span>
              </span>
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

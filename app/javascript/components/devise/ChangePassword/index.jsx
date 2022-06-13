import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'

import { FixedBackground } from '../../../layouts/FixedBackground'
import styles from './styles.module.scss'
import { imageURL } from '../../../helpers/Cloudinary'
import { postReq, putReq } from '../../../helpers/HTTPRequest'
import { postAuthentication } from '../../../helpers/Devise'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
const validationSchema = yup.object({
  password: yup.string().required('Password is required').min(8, 'Password must be at least 6 characters'),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const userTypes = [
  { value: 'artist', label: 'Artist' },
  { value: 'venue', label: 'Venue' },
]

const ChangePassword = ({ token }) => {
  // const { params } = useParams()
  const [resetPasswordToken, setResetPasswordToken] = useState('')

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const reset_password_token = urlParams.get('reset_password_token')
    setResetPasswordToken(reset_password_token)
  }, [])

  const [errorAlert, setErrorAlert] = useState({ show: false, title: '', message: '' })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  })
  const onSubmit = values => {
    const reqCallback = ({ errors, data }) => {
      if (errors) {
        const { title, detail: message } = errors[0]
        setErrorAlert({ show: true, title, message })
      } else {
        if (data.profile_type === 'artist_profile') {
          window.location.replace(`/artists/${data.id}`)
        } else if (data.profile_type === 'venue_profile') {
          window.location.replace(`/venues/${data.id}`)
        } else {
          window.location.replace(`/create-artist-profile`)
        }
      }
    }
    putReq(
      '/users/password',
      {
        user: {
          password: values.password,
          password_confirmation: values.confirm_password,
          reset_password_token: resetPasswordToken,
        },
      },
      token,
    ).then(reqCallback)
  }

  return (
    <FixedBackground bgImg={imageURL('v1634803101/bg/signup.jpg')}>
      <div className={styles.mainContent}>
        <div className={styles.column}>
          <div className={styles.row}>
            <a href="/" className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.ForgetPasswordFormContainer}>
              <div className={styles.titleContainer}>
                <span className={styles.titleText}>Reset your</span>
                <span className={styles.passwordText}>&nbsp;password</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.forgotPasswordForm}>
                <Collapse in={errorAlert.show}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, title: '', message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <p className={styles.label}>Password</p>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      helperText={errors.password && errors.password.message}
                      className={styles.emailContainer}
                      name="password"
                      error={errors.password}
                      placeholder="Enter new password"
                      value={field.value}
                      type="password"
                      errorMessage={errors.password?.message}
                      {...field}
                    />
                  )}
                />
                <p className={styles.label}>Confirm Password</p>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      helperText={errors.confirm_password && errors.confirm_password.message}
                      className={styles.emailContainer}
                      name="confirm_password"
                      error={errors.confirm_password}
                      placeholder="Confirm password"
                      value={field.value}
                      type="password"
                      errorMessage={errors.confirm_password?.message}
                      {...field}
                    />
                  )}
                />

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{ mt: '57px', pt: 2, pb: 2 }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

export default ChangePassword

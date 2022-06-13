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

import { FixedBackground } from '../../../layouts/FixedBackground'
import styles from './styles.module.scss'
import { imageURL } from '../../../helpers/Cloudinary'
import { postFormData, postReq } from '../../../helpers/HTTPRequest'
import { postAuthentication } from '../../../helpers/Devise'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
})

const userTypes = [
  { value: 'artist', label: 'Artist' },
  { value: 'venue', label: 'Venue' },
]

const ForgotPassword = ({ token }) => {
  const [infoAlert, setInfoAlert] = useState({ show: false, title: '', message: '' })
  const [errorAlert, setErrorAlert] = useState({ show: false, title: '', message: '' })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = values => {
    setInfoAlert({ show: true, title: 'Success', message: 'Check your email for a reset link.' })
    setErrorAlert({ show: false, title: '', message: '' })
    postReq(
      '/users/password',
      {
        user: values,
      },
      token,
    ).then(({ errors, data }) => {
      if (data.status === 401) {
        setInfoAlert({ show: false, title: '', message: '' })
        setErrorAlert({ show: true, title: 'Error', message: 'Invalid email' })
        return
      }
    })
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
                <Collapse in={infoAlert.show} style={{ width: '100%' }}>
                  <Alert severity="info" onClose={() => setInfoAlert({ show: false, title: '', message: '' })}>
                    <AlertTitle>{infoAlert.title}</AlertTitle>
                    {infoAlert.message}
                  </Alert>
                </Collapse>
                <Collapse in={errorAlert.show} style={{ width: '100%' }}>
                  <Alert severity="error" onClose={() => setErrorAlert({ show: false, title: '', message: '' })}>
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.message}
                  </Alert>
                </Collapse>
                <p className={styles.label}>Email</p>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      helperText={errors.email && errors.email.message}
                      className={styles.emailContainer}
                      name="email"
                      // label="Email"
                      error={errors.email}
                      placeholder="example@email.com"
                      value={field.value}
                      errorMessage={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <div className={styles.message}>
                  Enter your email address and we’ll send you a link to reset your password or recover your account.
                </div>
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

              <div className={styles.backToSignInContainer}>
                <p className={styles.backText}>Back to &nbsp;</p>
                <a className={styles.textStyle} href="/users/sign_in">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

export default ForgotPassword

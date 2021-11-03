import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './styles.module.scss'
import { Context } from '../../components/App'
import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { imageURL } from '../../helpers/Cloudinary'
import { postReq } from '../../helpers/HTTPRequest'
import { FormPage1 } from './FormPage1'
import { FormPage2 } from './FormPage2'
import { FormPage3 } from './FormPage3'

const validationSchema = yup.object({
  full_name: yup.string().required('Your legal name is required'),
  minimum_budget: yup.string().required('You have to enter your minimum budget'),
  artist_name: yup.string().required('Your artist / band name is required'),
  location: yup.string().required('Your Location is required'),
  genre: yup.array().required('Please choose at least one genre'),
  unique_statement: yup.string().required('You have to enter a unique statement'),
  website: yup.string().url('Enter a valid URL for your website.'),
})

const NUM_OF_PAGES = 3

export const CreateArtistProfile = () => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { currentUser, token } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [curPageNum, setCurPageNum] = useState(1)

  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone: '',
      profile_picture: '',
      minimum_budget: '',
      artist_name: '',
      location: '',
      zip_code: '',
      genre: [],
      unique_statement: '',
      biography: '',
      other_venue_plays: '',
      website: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      postReq('/api/v1/artist_profile', values, token, undefined)
        .then(({ errors, data }) => {
          if (errors) {
            const { title, detail: message } = errors[0]
            setErrorAlert({ show: true, title, message })
          } else {
            window.location.replace('/')
          }
        })
        .catch(e => console.error(e))
    },
  })

  const FormPages = [
    <FormPage1 formik={formik} email={currentUser.email} />,
    <FormPage2 formik={formik} />,
    <FormPage3 formik={formik} />,
  ]

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1635338046/bg/artists_profile.jpg')}>
      <Backdrop
        sx={{ display: 'flex', flexDirection: 'column', color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
        Creating Profile ...
      </Backdrop>
      <Box display="flex" width="100vw">
        <Box display="flex" flexDirection="column" m="58px auto auto">
          <Box display="flex">
            <Box display="flex" flexDirection="column" className={styles.formContainer}>
              <Collapse in={errorAlert.show}>
                <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                  <AlertTitle>{errorAlert.title}</AlertTitle>
                  {errorAlert.message}
                </Alert>
              </Collapse>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {FormPages[curPageNum - 1]}
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
                  <span style={{ margin: 'auto' }}>
                    Page {curPageNum} of {NUM_OF_PAGES}
                  </span>
                  {curPageNum === NUM_OF_PAGES ? (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled
                      sx={{ width: '120px' }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={() => setCurPageNum(curPageNum + 1)}
                      sx={{ width: '120px' }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

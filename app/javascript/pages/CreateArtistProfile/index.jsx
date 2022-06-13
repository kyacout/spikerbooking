import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import { DirectUpload } from 'activestorage'

import styles from './styles.module.scss'
import { Context } from '../../components/App'
import { Loading } from '../../components/Loading'
import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import { imageURL } from '../../helpers/Cloudinary'
import { FormPage1 } from './FormPage1'
import { FormPage2 } from './FormPage2'
import { FormPage3 } from './FormPage3'
import { useStore } from '../../store/store'

export const CreateArtistProfile = () => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' })
  const { currentUser } = useContext(Context)
  const { artist } = useStore()

  const [curPageNum, setCurPageNum] = useState(1)

  const FormPages = [
    <FormPage1
      key={1}
      email={currentUser.email}
      visible={curPageNum === 1}
      curPageNum={curPageNum}
      numOfPages={numOfPages}
      setCurPageNum={setCurPageNum}
    />,
    <FormPage2
      key={2}
      visible={curPageNum === 2}
      curPageNum={curPageNum}
      numOfPages={numOfPages}
      setCurPageNum={setCurPageNum}
    />,
    <FormPage3
      key={3}
      visible={curPageNum === 3}
      curPageNum={curPageNum}
      numOfPages={numOfPages}
      setCurPageNum={setCurPageNum}
    />,
  ]

  const numOfPages = FormPages.length

  return (
    <FixedBackgroundHeaderFooter bgImg={imageURL('v1635338046/bg/artists_profile.jpg')}>
      <Box display="flex" width="100%">
        <Box display="flex" flexDirection="column" m="58px auto auto" width="100%">
          <Box display="flex">
            <Box display="flex" flexDirection="column" padding={6} className={styles.formContainer}>
              <Collapse in={errorAlert.show}>
                <Alert severity="error" onClose={() => setErrorAlert({ show: false, message: '' })}>
                  <AlertTitle>{errorAlert.title}</AlertTitle>
                  {errorAlert.message}
                </Alert>
              </Collapse>
              {FormPages}
            </Box>
          </Box>
        </Box>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

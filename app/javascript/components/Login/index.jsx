import React from 'react'
import { Formik, Form, Field } from 'formik'

import { FixedBackground } from '../../layout/FixedBackground'
import { imageURL } from '../../helpers/cloudinary'
import styles from './styles.module.scss'

const Login = ({ token }) => {
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
                Sign in to <span className={styles.red}>Spikerbooking</span>
              </span>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values =>
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                  }, 500)
                }
                render={({ values }) => (
                  <Form className={styles.form}>
                    <Field
                      className={styles.textfield}
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                    />
                    <Field
                      className={styles.textfield}
                      type="password"
                      name="password"
                      placeholder="Password"
                      style={{ marginBottom: '100px' }}
                    />
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </FixedBackground>
  )
}

export default Login
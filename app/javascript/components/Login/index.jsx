import React from 'react'
import { Formik, Form, Field } from 'formik'

import styles from './styles.module.scss'

const Login = ({ token }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.column}>
        <div className={styles.row}>
          <a href="/" className={styles.logoContainer}>
            <img src="https://res.cloudinary.com/spikerbooking-dev/image/upload/v1634564817/logo3x_ugoahs.png" alt="" />
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
  )
}

export default Login

import React from 'react'
import clsx from 'clsx'
import { Formik, Form, Field } from 'formik'

import styles from './styles.module.scss'

const Signup = ({ token }) => {
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
            <span className={styles.formHeading}>Join Spikerbooking</span>
            <span className={clsx(styles.formHeading, styles.red)}>It's Free!</span>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '', userType: 'Artist' }}
              onSubmit={values =>
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                }, 500)
              }
              render={({ values }) => (
                <Form className={styles.form}>
                  <div className={styles.formElement}>
                    <span className={styles.label}>Email</span>
                    <Field
                      className={styles.textfield}
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={values.email}
                    />
                  </div>
                  <div className={styles.formElement}>
                    <span className={styles.label}>Password</span>
                    <Field
                      className={styles.textfield}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                    />
                  </div>
                  <div className={styles.formElement}>
                    <span className={styles.label}>Confirm password</span>
                    <Field
                      className={styles.textfield}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={values.confirmPassword}
                    />
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

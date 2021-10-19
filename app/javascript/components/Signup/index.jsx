import React from 'react'
import { Formik, Form, Field } from 'formik'

import styles from './styles.module.scss'

const Signup = ({ token }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.column}>
        <div className={styles.row}>
          <div className={styles.logoContainer}>
            <img src="https://res.cloudinary.com/spikerbooking-dev/image/upload/v1634564817/logo3x_ugoahs.png" alt="" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.signupFormContainer}>
            <span>Join Spikerbooking</span>
            <span className={styles.red}>It's Free!</span>
            <Formik
              initialValues={{ email: '', password: '', confirm_password: '' }}
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
                  <Field className={styles.textfield} type="password" name="password" placeholder="Password" />
                  <Field
                    className={styles.textfield}
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
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

export default Signup

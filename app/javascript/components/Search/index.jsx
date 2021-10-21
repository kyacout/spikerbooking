import React from 'react'
import clsx from 'clsx'

import { FixedBackground } from '../../layout/FixedBackground'
import { imageURL } from '../../helpers/cloudinary'
import styles from './styles.module.scss'

const Search = ({ signInPath, signUpPath }) => {
  return (
    <FixedBackground bgImg={imageURL('v1634803096/bg/search.jpg')}>
      <div className={styles.flexContainer}>
        <div className={styles.header}>
          <div className={styles.headerItem} />
          <div className={styles.headerItem}>
            <div className={styles.logoContainer}>
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </div>
          </div>
          <div className={styles.headerItem}>
            <a href={signInPath} className={styles.button}>
              <span>Sign in</span>
            </a>
            <a href={signUpPath} className={clsx(styles.button, styles.red)} style={{ marginLeft: '27px' }}>
              <span>Sign up</span>
            </a>
          </div>
        </div>
        <div className={styles.navbar}>
          <a href="/" className={styles.first}>
            About us
          </a>
          <a href="/">Contact us</a>
          <a href="/">FAQs</a>
          <a href="/">Terms and conditions</a>
        </div>
        <div className={styles.banner}>
          <span className={styles.h1}>Easy Booking</span>
          <span className={styles.h2}>for hard-hitting talent</span>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.magnifierContainer}>
            <img
              src="https://res.cloudinary.com/spikerbooking-dev/image/upload/v1634573580/500px-Search_Icon.svg3x_djoo78.png"
              alt=""
            />
          </div>
          <input type="text" name="name" placeholder="Search for an Artist / Band" className={styles.searchBar} />
        </div>
      </div>
    </FixedBackground>
  )
}

export default Search

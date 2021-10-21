import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import styles from './styles.module.scss'

export const FixedBackground = ({ bgImg, children }) => {
  return (
    <>
      <CssBaseline />
      <img src={bgImg} className={styles.bg} alt="" />
      <div className="bgLogoContainer">
        <img
          src="https://res.cloudinary.com/spikerbooking-dev/image/upload/v1634557521/Logo_white3x-2_oavpkc.png"
          className={styles.bgLogoContainer}
          alt=""
        />
      </div>
      {children}
    </>
  )
}

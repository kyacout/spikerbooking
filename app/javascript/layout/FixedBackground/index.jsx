import React from 'react'

import { App } from '../App'
import { imageURL } from '../../helpers/cloudinary'
import styles from './styles.module.scss'

export const FixedBackground = ({ bgImg, children }) => {
  return (
    <App>
      <img src={bgImg} className={styles.bg} alt="" />
      <div className="bgLogoContainer">
        <img src={imageURL('v1634557521/white_logo.png')} className={styles.bgLogoContainer} alt="" />
      </div>
      {children}
    </App>
  )
}

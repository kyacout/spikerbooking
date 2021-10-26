import React from 'react'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'
import { BaseLayout } from '../BaseLayout'

export const FixedBackground = ({ bgImg, children }) => {
  return (
    <BaseLayout>
      <img src={bgImg} className={styles.bg} alt="" />
      <div className="bgLogoContainer">
        <img src={imageURL('v1634557521/white_logo.png')} className={styles.bgLogoContainer} alt="" />
      </div>
      {children}
    </BaseLayout>
  )
}

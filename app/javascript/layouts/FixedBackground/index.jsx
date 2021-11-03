import React from 'react'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'
import { BaseLayout } from '../BaseLayout'

export const FixedBackground = ({ bgImg, children, bgLogo = true }) => {
  return (
    <BaseLayout>
      <img src={bgImg} className={styles.bg} alt="" />
      {bgLogo && <img src={imageURL('v1634557521/white_logo.png')} className={styles.bgLogoContainer} alt="" />}
      <div className={styles.pageContainer}>{children}</div>
    </BaseLayout>
  )
}

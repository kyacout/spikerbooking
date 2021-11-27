import React from 'react'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'
import { BaseLayout } from '../BaseLayout'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

export const FixedBackground = ({ bgImg, children, bgLogo = true }) => {
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <BaseLayout>
      <img src={(widerThanMobile && bgImg) || undefined} className={styles.bg} alt="" />
      {bgLogo && widerThanMobile && (
        <img src={imageURL('v1634557521/white_logo.png')} className={styles.bgLogoContainer} alt="" />
      )}

      <div className={styles.pageContainer}>{children}</div>
    </BaseLayout>
  )
}

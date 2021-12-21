import React from 'react'
import clsx from 'clsx'
import map from 'lodash/map'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { FooterColumnsData } from './FooterColumnsData'
import { FooterColumns } from './FooterColumns'

export const Footer = () => {
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <footer className={styles.footer}>
      <img src={imageURL('v1635331467/bg/footer.jpg')} className={styles.bg} alt="" />
      <div className={styles.container}>
        <div className={styles.row}>
          <a href="/" className={styles.logoContainer}>
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
          </a>
        </div>
        <div className={widerThanMobile ? styles.row : ''}>
          {map(FooterColumnsData, FooterColumns)}
          <div className={styles.column}>
            <span className={clsx(styles.text, styles.title)}>Follow us</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={clsx(styles.text, styles.copyright)}>
            Copyright © 2010-2021 SpikerBooking S.L. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

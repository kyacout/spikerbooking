import React from 'react'
import clsx from 'clsx'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={imageURL('v1635331467/bg/footer.jpg')} className={styles.bg} alt="" />
      <div className={styles.container}>
        <div className={styles.row}>
          <a href="/" className={styles.logoContainer}>
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
          </a>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <span className={clsx(styles.text, styles.title)}>Content</span>
            <span className={styles.text}>New resources</span>
            <span className={styles.text}>The most popular content</span>
            <span className={styles.text}>Search trends</span>
            <span className={styles.text}>Blog</span>
          </div>
          <div className={styles.column}>
            <span className={clsx(styles.text, styles.title)}>Information</span>
            <span className={styles.text}>Plans & pricing</span>
            <span className={styles.text}>About us</span>
            <span className={styles.text}>Jobs</span>
            <span className={styles.text}>Sell your content</span>
          </div>
          <div className={styles.column}>
            <span className={clsx(styles.text, styles.title)}>Legal</span>
            <span className={styles.text}>Terms & conditions</span>
            <span className={styles.text}>License Agreement</span>
            <span className={styles.text}>Privacy policy</span>
            <span className={styles.text}>Copyright information</span>
          </div>
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

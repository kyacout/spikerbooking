import React from 'react'

import styles from './styles.module.scss'
import { FixedBackground } from '../FixedBackground'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export const FixedBackgroundHeaderFooter = ({ bgImg, children }) => {
  return (
    <FixedBackground bgImg={bgImg}>
      <Header />
      <div className={styles.mainContent}>{children}</div>
      <Footer />
    </FixedBackground>
  )
}

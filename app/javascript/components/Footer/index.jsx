import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'

export const Footer = () => {
  const history = useHistory()

  return (
    <div className={styles.footer}>
      <div></div>
    </div>
  )
}

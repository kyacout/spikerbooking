import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'

export const Header = () => {
  const history = useHistory()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={imageURL('v1635321933/logo_colored.jpg')} alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => history.push('/')}
          sx={{ borderRadius: '75px', textTransform: 'none' }}
        >
          Home
        </Button>
      </div>
    </header>
  )
}

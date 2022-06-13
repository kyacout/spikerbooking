import React from 'react'
import Box from '@mui/material/Box'

import { FixedBackgroundHeaderFooter } from '../../layouts/FixedBackgroundHeaderFooter'
import styles from './styles.module.scss'

export const PageNotFound = () => {
  return (
    <FixedBackgroundHeaderFooter>
      <Box className={styles.mainContainer}>
        <span style={{ margin: 'auto' }}>Page not Found!</span>
      </Box>
    </FixedBackgroundHeaderFooter>
  )
}

import React, { useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import IconButton from '@mui/material/IconButton'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import map from 'lodash/map'

export const FooterColumns = ({ columnTitle, columnItems }) => {
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('md'))
  const [columnOpen, setColumnOpen] = useState(false)

  return (
    <div className={styles.column}>
      <span className={styles.row}>
        <span className={clsx(styles.text, styles.title)} onClick={() => setColumnOpen(!columnOpen)}>
          {columnTitle}
        </span>
        {!widerThanMobile && (
          <IconButton style={{ margin: 'auto 0 auto 0' }} onClick={() => setColumnOpen(!columnOpen)}>
            {columnOpen ? (
              <ArrowDropUp style={{ fill: 'white', width: '40px', height: '40px' }} />
            ) : (
              <ArrowDropDown style={{ fill: 'white', width: '40px', height: '40px' }} />
            )}
          </IconButton>
        )}
      </span>
      {columnOpen || widerThanMobile ? map(columnItems, ContentColumnItems) : ''}
    </div>
  )
}

export const ContentColumnItems = ({ itemName, route }) => {
  return <span className={styles.text}>{itemName}</span>
}

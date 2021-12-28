import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'

import styles from '../styles.module.scss'
import { imageURL } from '../../../helpers/Cloudinary'
import { HeaderButtons } from './HeaderButtons'
import { Context } from '../../../components/App'
import { Menu } from './Menu'
import { HeaderQuickLinks } from './HeaderData'

export const Header = () => {
  const { currentUser, token } = useContext(Context)
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('md'))
  const widerThanTablet = useMediaQuery(theme.breakpoints.up('lg'))
  const [menuOpen, setMenuOpen] = useState(false)

  if (widerThanTablet || widerThanMobile) {
    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container flexDirection={widerThanTablet ? 'unset' : 'column'}>
          {widerThanTablet ? (
            <Grid m="auto" flex="1">
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" style={{ maxWidth: '327px' }} />
            </Grid>
          ) : (
            <Box m="auto" width="327px">
              <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
            </Box>
          )}
          <Grid m="auto" display="flex" justifyContent="space-between" minWidth={currentUser ? '415px' : '665px'}>
            {HeaderQuickLinks.map(({ route, title }, index) => (
              <a key={index} href={route} className={clsx(styles.bold, styles.headerLink)}>
                {title}
              </a>
            ))}
            <HeaderButtons currentUser={currentUser} token={token} />
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6} m="auto">
          <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
        </Grid>
        <Grid item xs={6} display="flex" sx={{ justifyContent: 'flex-end' }} onBlur={() => setMenuOpen(false)}>
          <span className={styles.bold} style={{ fontSize: '12px', marginRight: '4px' }}>
            Menu
          </span>
          <IconButton style={{ margin: 'auto 0 auto 0' }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
            ) : (
              <MenuIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
            )}
          </IconButton>
        </Grid>
      </Grid>
      {menuOpen && <Menu currentUser={currentUser} />}
    </Box>
  )
}

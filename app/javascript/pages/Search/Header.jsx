import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'

import styles from './styles.module.scss'
import { imageURL } from '../../helpers/Cloudinary'
import { HeaderButtons } from './HeaderButtons'
import { Context } from '../../components/App'
import { Menu } from './Menu'

export const Header = () => {
  const { currentUser, token } = useContext(Context)
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('md'))
  const widerThanTablet = useMediaQuery(theme.breakpoints.up('lg'))
  const [menuOpen, setMenuOpen] = useState(false)

  if (widerThanTablet) {
    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container>
          <Grid m="auto" flex="1">
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" style={{ maxWidth: '327px' }} />
          </Grid>
          <Grid m="auto" display="flex" justifyContent="space-between" minWidth={currentUser ? '415px' : '665px'}>
            <a href="/" className={styles.bold}>
              About us
            </a>
            <a href="/" className={styles.bold}>
              Contact us
            </a>
            <HeaderButtons currentUser={currentUser} token={token} />
          </Grid>
        </Grid>
      </Box>
    )
  }

  if (widerThanMobile) {
    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container flexDirection="column">
          <Box m="auto" width="327px">
            <img src={imageURL('v1634564817/white_full_logo.png')} alt="" />
          </Box>
          <Box m="auto" display="flex" justifyContent="space-between" width={currentUser ? '415px' : '665px'}>
            <a href="/" className={styles.bold}>
              About us
            </a>
            <a href="/" className={styles.bold}>
              Contact us
            </a>
            <HeaderButtons currentUser={currentUser} token={token} />
          </Box>
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
        <Grid item xs={6} display="flex">
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

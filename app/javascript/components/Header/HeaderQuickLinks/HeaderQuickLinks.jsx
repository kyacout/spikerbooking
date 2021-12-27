import { HeaderQuickLinksData } from './HeaderQuickLinksData'
import { Box, Grid, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import styles from '../styles.module.scss'
import React, { useState } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import { useHistory } from 'react-router-dom'

export const HeaderQuickLinks = () => {
  const theme = useTheme()
  const widerThanMobile = useMediaQuery(theme.breakpoints.up('md'))

  return widerThanMobile ? <HeaderQuickLinksBigScreen /> : <HeaderQuickLinksMobile />
}

const HeaderQuickLinksMobile = () => {
  const [DropdownOpen, setDropdownOpen] = useState(false)
  const history = useHistory()

  return (
    <Box style={{ margin: 'auto 0 auto auto' }} onBlur={() => setDropdownOpen(false)}>
      <IconButton onClick={() => setDropdownOpen(!DropdownOpen)}>
        {DropdownOpen ? (
          <CloseIcon style={{ width: '40px', height: '40px' }} />
        ) : (
          <MenuIcon style={{ width: '40px', height: '40px' }} />
        )}
      </IconButton>
      {DropdownOpen ? (
        <Paper sx={{ width: 'auto', maxWidth: '100%', position: 'fixed', right: '50px' }}>
          <MenuList>
            {HeaderQuickLinksData.map(({ title, route }, index) => (
              <MenuItem key={index} onClick={() => history.push(route)}>
                <ListItemText>{title}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      ) : (
        ''
      )}
    </Box>
  )
}

const HeaderQuickLinksBigScreen = () => {
  const history = useHistory()

  return (
    <Grid container>
      {HeaderQuickLinksData.map(({ title, route }, index ) => (
        <Grid key={index} m="auto" display="flex" justifyContent="space-between" columns={{ xs: 4, sm: 8, md: 12 }}>
          <div className={styles.quickLink} onClick={() => history.push(route)}>
            {title.toUpperCase()}
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

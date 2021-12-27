import React, { useState } from 'react'
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import map from 'lodash/map'
import { HeaderProfileDropDownData } from './HeaderProfileDropDownData'
import { useHistory } from 'react-router-dom'
import styles from '../styles.module.scss'
import Avatar from '@mui/material/Avatar'

export const HeaderProfileDropDown = ({ profilePhoto }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const photo = profilePhoto && '@mui/icons-material/AccountCircleRounded'

  return (
    <Box
      className={styles.profilePhoto}
      onClick={() => setDropdownOpen(!dropdownOpen)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <Avatar
        size="md"
        src={photo}
        sx={{ height: '50px', width: '50px', mt: '20px', alignSelf: 'center', marginTop: '0' }}
      />

      {dropdownOpen && (
        <Paper sx={{ width: 'auto', maxWidth: '100%', position: 'fixed', right: '50px' }}>
          <MenuList>{map(HeaderProfileDropDownData, HeaderProfileDropDownItem)}</MenuList>
        </Paper>
      )}
    </Box>
  )
}

export const HeaderProfileDropDownItem = ({ icon, title, route }, index ) => {
  const history = useHistory()

  return (
    <MenuItem key={index} onClick={() => history.push(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  )
}

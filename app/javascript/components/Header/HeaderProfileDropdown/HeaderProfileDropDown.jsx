import React, { useState } from 'react'
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import map from 'lodash/map'
import { HeaderProfileDropDownData, HeaderProfileSignedOutData } from './HeaderProfileDropDownData'
import { useHistory } from 'react-router-dom'
import styles from '../styles.module.scss'
import Avatar from '@mui/material/Avatar'

export const HeaderProfileDropDown = ({ currentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const photo = currentUser? currentUser?.profile_photo :  '@mui/icons-material/AccountCircleRounded'
  const menuItems = currentUser ? HeaderProfileDropDownData : HeaderProfileSignedOutData

  return (
    <Box
      className={styles.profilePhoto}
      onClick={() => setDropdownOpen(!dropdownOpen)}>
      <Avatar
        size="md"
        src={photo}
        sx={{ height: '50px', width: '50px', mt: '20px', alignSelf: 'center', marginTop: '0' }}
      />

      {dropdownOpen && (
        <Paper sx={{ width: 'auto', maxWidth: '100%', position: 'fixed', right: '50px' }}>
          <MenuList>{map(menuItems, HeaderProfileDropDownItem)}</MenuList>
        </Paper>
      )}
    </Box>
  )
}

export const HeaderProfileDropDownItem = ({ icon, title, externalRoute = false, route }, index) => {
  const history = useHistory()

  return (
    <MenuItem
      key={index}
      onClick={() => {
        if (externalRoute) {
          window.location.replace(route)
        } else {
          history.push(route)
        }
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  )
}

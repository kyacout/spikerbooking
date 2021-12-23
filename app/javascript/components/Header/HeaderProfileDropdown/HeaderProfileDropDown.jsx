import React, { useState } from 'react'
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import map from 'lodash/map'
import { HeaderProfileDropDownData } from './HeaderProfileDropDownData'
import { useHistory } from 'react-router-dom'
import styles from '../styles.module.scss'
import { AccountCircleOutlined } from '@mui/icons-material'

export const HeaderProfileDropDown = ({ profilePhoto }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <Box
      className={styles.buttonsContainer}
      onClick={() => setDropdownOpen(!dropdownOpen)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {styles.profilePhoto ? (
        <img src={profilePhoto} className={styles.profilePhoto} />
      ) : (
        <AccountCircleOutlined sx={{ fontSize: 70 }} />
      )}

      {dropdownOpen ? (
        <Paper sx={{ width: 'auto', maxWidth: '100%', position: 'fixed', right: '50px' }}>
          <MenuList>{map(HeaderProfileDropDownData, HeaderProfileDropDownItem)}</MenuList>
        </Paper>
      ) : (
        ''
      )}
    </Box>
  )
}

export const HeaderProfileDropDownItem = ({ icon, title, route }) => {
  const history = useHistory()

  return (
    <MenuItem onClick={() => history.push(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  )
}

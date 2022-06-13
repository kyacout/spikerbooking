import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { HeaderButtonsData, HeaderQuickLinks } from './HeaderData'
import map from 'lodash/map'

export const Menu = ({ currentUser }) => {
  const userState = currentUser ? HeaderButtonsData.toLogOut : HeaderButtonsData.toLogIn

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', position: 'fixed', right: '0' }} style={{ zIndex: '999' }}>
      <MenuList>
        {/* to login or log out*/}
        {map(userState, ItemMenu)}
        <Divider />
        {/* quick links */}
        {map(HeaderQuickLinks, ItemMenu)}
      </MenuList>
    </Paper>
  )
}

export const ItemMenu = ({ icon, title, route }, index) => (
  <MenuItem key={index} onClick={() => (window.location = route)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{title}</ListItemText>
  </MenuItem>
)

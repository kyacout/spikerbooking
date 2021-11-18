import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import EmailIcon from '@mui/icons-material/Email'
import InfoIcon from '@mui/icons-material/Info'

import { deleteReq } from '../../helpers/HTTPRequest'

export const Menu = ({ currentUser, token }) => {
  const handleLogout = () => {
    deleteReq('users/sign_out/', token)
      .then(() => window.location.replace('/'))
      .catch(e => console.error(e))
  }

  const UserMenuItems = () =>
    currentUser ? (
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    ) : (
      <>
        <MenuItem onClick={() => (window.location = '/users/sign_up')}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign up</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => (window.location = '/users/sign_in')}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log in</ListItemText>
        </MenuItem>
      </>
    )

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', position: 'fixed', right: '0' }}>
      <MenuList>
        <UserMenuItems />
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>About us</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Contact us</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

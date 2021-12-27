import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'

export const HeaderProfileSignedOutData = [
  {
    icon: <LoginIcon fontSize="small" />,
    title: 'Sign in',
    externalRoute: true,
    route: '/users/sign_in',
  },
  {
    icon: <PersonAddIcon fontSize="small" />,
    title: 'Create new Account',
    externalRoute: true,
    route: '/users/sign_up',
  },
]

export const HeaderProfileDropDownData = [
  {
    icon: <AccountCircleOutlined fontSize="small" />,
    title: 'View Profile',
    route: '/view-profile',
  },
  {
    icon: <SettingsOutlinedIcon fontSize="small" />,
    title: 'Edit Profile',
    route: '/edit-profile',
  },
  {
    icon: <LogoutIcon fontSize="small" />,
    title: 'Logout',
    route: '/logout',
  },
]

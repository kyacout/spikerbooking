import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { AccountCircleOutlined } from '@mui/icons-material'

export const HeaderProfileDropDownData = [
  {
    icon: <AccountCircleOutlined fontSize="small" />,
    title: 'view profile',
    route: '/view-profile',
  },
  {
    icon: <SettingsOutlinedIcon fontSize="small" />,
    title: 'edit profile',
    route: '/edit-profile',
  },
  {
    icon: <LogoutIcon fontSize="small" />,
    title: 'logout',
    route: '/logout',
  },
]

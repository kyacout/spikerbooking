import InfoIcon from '@mui/icons-material/Info'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import { LocationCity, PeopleAlt } from '@mui/icons-material'

export const HeaderQuickLinks = [
  {
    icon: <PeopleAlt fontSize="small"/>,
    title: 'Artists',
    route: '/artists',
  },
  {
    icon: <LocationCity fontSize="medium"/>,
    title: 'Venues',
    route: '/venues',
  },
  {
    icon: <InfoIcon fontSize="small" />,
    title: 'About us',
    route: '/',
  },
  {
    icon: <EmailIcon fontSize="small" />,
    title: 'Contact us',
    route: '/',
  },
]

export const HeaderButtonsData = {
  toLogOut: [
    {
      icon: <LogoutIcon fontSize="small" />,
      title: 'Log out',
      route: '/logout',
      buttonColor: 'primary',
    },
  ],
  toLogIn: [
    {
      icon: <LoginIcon fontSize="small" />,
      title: 'Log in',
      route: '/users/sign_in',
      buttonColor: 'secondary',
    },
    {
      icon: <PersonAddIcon fontSize="small" />,
      title: "Sign up, it's Free!",
      route: '/users/sign_up',
      buttonColor: 'primary',
    },
  ],
}

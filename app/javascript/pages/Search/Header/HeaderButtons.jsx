import React from 'react'
import Button from '@mui/material/Button'
import { HeaderButtonsData } from './HeaderData'

export const HeaderButtons = ({ currentUser, token }) => {

  const userState = (currentUser ? HeaderButtonsData.toLogOut: HeaderButtonsData.toLogIn).reverse();

  return (
    <>
      {userState.map( ({ title, route, buttonColor}, index) => (
        <Button
          key={index}
          color= {buttonColor}
          variant="contained"
          size="large"
          onClick={() => (window.location = route)}
          sx={{ m: 'auto', borderRadius: '75px', fontWeight: 'bold', textTransform: 'none', fontSize: '1.2rem', margin: '0 5px' }}
        >
          {title}
        </Button>
      ))}
    </>
  )
}

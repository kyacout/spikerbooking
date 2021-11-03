import React from 'react'
import Box from '@mui/material/Box'

import { FixedBackground } from './FixedBackground'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const FixedBackgroundHeaderFooter = ({ bgImg, children }) => {
  return (
    <FixedBackground bgImg={bgImg} bgLogo={false}>
      <Header />
      <Box display="flex" width="100vw">
        {children}
      </Box>
      <Footer />
    </FixedBackground>
  )
}

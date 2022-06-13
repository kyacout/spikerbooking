import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { BaseLayout } from '../layouts/BaseLayout'

export const Loading = ({ loading, message = '' }) => {
  return (
    <BaseLayout>
      <Backdrop
        sx={{ display: 'flex', flexDirection: 'column', color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
        {message}
      </Backdrop>
    </BaseLayout>
  )
}

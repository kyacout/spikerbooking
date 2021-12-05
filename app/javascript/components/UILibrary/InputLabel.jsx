import React from 'react'
import MUIInputLabel from '@mui/material/InputLabel'

export const InputLabel = ({ htmlFor, label, mt = '10px', required }) => {
  return (
    <MUIInputLabel
      htmlFor={htmlFor}
      shrink
      sx={{
        display: 'inline',
        position: 'relative',
        width: '300px',
        minWidth: '300px',
        fontSize: '25px',
        color: '#000',
        fontWeight: '600',
        margin: `${mt} 10px auto 0`,
        whiteSpace: 'normal',
        textAlign: 'left',

        '& span': {
          color: '#d32531',
          width: '0',
          m: '0',
          fontWeight: '600',
          fontSize: '25px',
        },
        fontSize: (theme) => ({
          [theme.breakpoints.down('md')]:{fontSize: '20px'}
        }),
      }}
    >
      {label && (
        <>
          {label}:{required ? <span>*</span> : null}
        </>
      )}
    </MUIInputLabel>
  )
}

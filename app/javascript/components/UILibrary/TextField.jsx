import React from 'react'
import MUITextField from '@mui/material/TextField'
import { InputLabel } from './InputLabel'
import FormControl from '@mui/material/FormControl'

export const TextField = ({ id, label, name, placeholder = '', required, errorMessage, register, value, ...props }) => {
  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: theme => ({
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
        }),
      }}
    >
      <InputLabel htmlFor={id} label={label} required={required} />

      <MUITextField
        aria-errormessage={errorMessage}
        error={!!errorMessage}
        helperText={errorMessage}
        fullWidth
        id={id}
        name={name}
        value={value}
        sx={{
          m: '0 0 32px 0',
          '& legend': {
            width: 0,
          },
        }}
        placeholder={placeholder}
        {...props}
      />
      {/* {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>} */}
    </FormControl>
  )
}

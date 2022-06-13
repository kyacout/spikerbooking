import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import FormControl from '@mui/material/FormControl'
import { InputLabel } from './InputLabel'

export const SingleSelectInput = ({
  id,
  name,
  value,
  label,
  placeholder = '',
  required = false,
  listItems,
  errorMessage,
  ...props
}) => {
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
      <TextField
        aria-errormessage={errorMessage}
        error={!!errorMessage}
        helperText={errorMessage}
        fullWidth
        id={id}
        name={name}
        value={value}
        select
        sx={{
          m: '0 0 32px 0',
          '& legend': {
            width: 0,
          },
        }}
        placeholder={placeholder}
        {...props}
      >
        {listItems.map(option => (
          <MenuItem
            key={option.value === undefined ? option : option.value}
            value={option.value === undefined ? option : option.value}
          >
            {option.name || option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  )
}

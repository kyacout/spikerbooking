import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import FormControl from '@mui/material/FormControl'
import { InputLabel } from './InputLabel'

export const SingleSelectInput = ({ id, name, formik, label, placeholder = '', required = false, listItems }) => {
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
        fullWidth
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        select
        sx={{
          m: '0 0 32px 0',
          '& legend': {
            width: 0,
          },
        }}
        placeholder={placeholder}
        required={required}
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

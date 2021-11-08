import React from 'react'
import MUITextField from '@mui/material/TextField'
import { InputLabel } from './InputLabel'
import FormControl from '@mui/material/FormControl'

export const TextField = ({
  id,
  name,
  formik,
  label,
  placeholder = '',
  required = false,
  maxLength = undefined,
  helperText = '',
  ...props
}) => {
  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel htmlFor={id} label={label} required={required} />
      <MUITextField
        fullWidth
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={e => {
          if (!maxLength || formik.values[name].length < maxLength) {
            formik.handleChange(e)
          }
        }}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={
          formik.errors[name] || (maxLength && `${formik.values[name].length}/${maxLength} characters`) || helperText
        }
        sx={{
          m: '0 0 32px 0',
          '& legend': {
            width: 0,
          },
        }}
        placeholder={placeholder}
        {...props}
      />
    </FormControl>
  )
}

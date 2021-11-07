import React from 'react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { InputLabel } from './InputLabel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export const UploadFile = ({ id, name, formik, label, buttonLabel, required = false }) => {
  return (
    <FormControl
      sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'space-between', mb: '32px' }}
    >
      <InputLabel htmlFor={id} label={label} mt="20px" required={required} />
      <Box display="flex" textAlign="center" mt="16px" mb="8px" flex="1">
        <Button
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 20px auto 0', width: '200px', minWidth: '200px' }}
          size="large"
        >
          {buttonLabel}
          <input name="press_sheet" type="file" hidden onChange={formik.handleChange} />
        </Button>
        <TextField value={formik.values[name]} fullWidth disabled />
      </Box>
    </FormControl>
  )
}

import React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'

import styles from './styles.module.scss'

export const FormPage3 = ({ formik }) => {
  return (
    <>
      <h1>Media Info</h1>
      <span className={styles.headerText}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <TextField
        fullWidth
        name="website"
        label="Website:"
        value={formik.values.website}
        onChange={formik.handleChange}
        error={formik.touched.website && Boolean(formik.errors.website)}
        helperText={formik.touched.website && formik.errors.website}
        margin="normal"
        placeholder="Enter your band's website URL"
      />
    </>
  )
}

import React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { InputLabel } from './InputLabel'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

export const MultiSelectInput = ({ formik, name, label, id, listItems, required }) => {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

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
      <Select
        fullWidth
        id={id}
        name={name}
        multiple
        value={formik.values[name]}
        onChange={e => {
          if (e.target.value.length <= 5) {
            formik.handleChange(e)
          }
        }}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        input={<OutlinedInput label="Chip" />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{
          m: '0 0 32px 0',
          '& legend': {
            width: 0,
          },
        }}
      >
        {listItems.map(item => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={formik.values[name].indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

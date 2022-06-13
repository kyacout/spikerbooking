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
import { FormHelperText } from '@mui/material'

export const MultiSelectInput = ({ errorMessage, value, name, label, id, listItems, required, ...props }) => {
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
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          m: '0 0 32px 0',
        }}
      >
        <Select
          aria-errormessage={errorMessage}
          error={!!errorMessage}
          helperText={errorMessage}
          fullWidth
          id={id}
          name={name}
          multiple
          defaultValue={[]}
          value={value}
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
            '& legend': {
              width: 0,
            },
          }}
          {...props}
        >
          {listItems.map(item => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={value ? value.includes(item) : false} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: '#d32f2f',
            fontSize: '0.75rem',
            width: '100%',
            fontWeight: 400,
            lineHeight: 1.66,
            textAlign: 'left',
            marginBottom: 0,
            marginLeft: 2,
          }}
        >
          {errorMessage}
        </FormHelperText>
      </Box>
    </FormControl>
  )
}

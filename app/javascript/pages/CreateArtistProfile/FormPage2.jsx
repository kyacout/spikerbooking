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

const genres = [
  "50's",
  "60's",
  "70's",
  "80's",
  "90's",
  'Acoustic',
  'Alternative/Indie',
  'Blues',
  'Bluegrass',
  'Country',
  'Outlaw Country',
  'Christian',
  'Classical',
  'Cover Band',
  'EDM/Dance',
  'Folk',
  'Funk',
  'Fusion',
  'Heavy Metal',
  'Hip-Hop/Rap',
  'Jazz',
  'Latin',
  'Motown',
  'Party/Pop',
  'Punk',
  'R&B',
  'Reggae',
  'Rock',
  'Soul',
  'Tribute Band',
  'Open to ideas',
]

export const FormPage2 = ({ formik }) => {
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
    <>
      <h1>Artist Profile Info</h1>
      <span className={styles.headerText}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <TextField
        fullWidth
        name="artist_name"
        label="Artist Name*:"
        value={formik.values.artist_name}
        onChange={formik.handleChange}
        error={formik.touched.artist_name && Boolean(formik.errors.artist_name)}
        helperText={formik.touched.artist_name && formik.errors.artist_name}
        margin="normal"
        placeholder="Ex: Danny Vintage"
      />
      <TextField
        fullWidth
        name="location"
        label="Location*:"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
        margin="normal"
        placeholder="Enter location as City, State"
      />
      <TextField
        fullWidth
        name="zip_code"
        label="Zip code:"
        value={formik.values.zip_code}
        onChange={formik.handleChange}
        error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
        helperText={formik.touched.zip_code && formik.errors.zip_code}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="artist-create-profile-genre">Genre (up to 5)*:</InputLabel>
        <Select
          labelId="artist-create-profile-genre"
          id="artist-create-profile-genre"
          name="genre"
          multiple
          value={formik.values.genre}
          onChange={e => {
            if (e.target.value.length <= 5) {
              formik.handleChange(e)
            }
          }}
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        name="unique_statement"
        label="Unique statement:"
        value={formik.values.unique_statement}
        onChange={formik.handleChange}
        error={formik.touched.unique_statement && Boolean(formik.errors.unique_statement)}
        helperText={formik.touched.unique_statement && formik.errors.unique_statement}
        margin="normal"
        placeholder="Enter your selling pitch, what makes you a unique live music artist"
      />
      <TextField
        fullWidth
        name="biography"
        label="Brief description:"
        multiline
        rows={3}
        value={formik.values.biography}
        onChange={formik.handleChange}
        error={formik.touched.biography && Boolean(formik.errors.biography)}
        helperText={formik.touched.biography && formik.errors.biography}
        margin="normal"
        placeholder="Enter a brief Artist / Band bio"
      />
      <TextField
        fullWidth
        name="other_venue_plays"
        label="Other venue plays:"
        value={formik.values.other_venue_plays}
        onChange={formik.handleChange}
        error={formik.touched.other_venue_plays && Boolean(formik.errors.other_venue_plays)}
        helperText={formik.touched.other_venue_plays && formik.errors.other_venue_plays}
        margin="normal"
        placeholder="Enter venues separated by a comma"
      />
    </>
  )
}

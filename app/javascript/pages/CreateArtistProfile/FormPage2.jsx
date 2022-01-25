import React from 'react'
import { TextField } from '../../components/UILibrary/TextField'
import { MultiSelectInput } from '../../components/UILibrary/MultiSelectInput'
import { SingleSelectInput } from '../../components/UILibrary/SingleSelectInput'

import styles from './styles.module.scss'

const genresList = [
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
const profileVisibility = ['show','hide']


export const FormPage2 = ({ formik, visible }) => {
  if (!visible) {
    return null
  }

  return (
    <>
      <h1>Artist Profile Info</h1>
      <span className={styles.headerText} style={{ marginBottom: '32px' }}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <TextField
        formik={formik}
        id="edit-artist-artist_name"
        name="artist_name"
        label="Artist Name"
        placeholder="Ex: Danny Vintage"
        required
      />
      <TextField
        formik={formik}
        id="edit-artist-location"
        name="location"
        label="Location"
        placeholder="Enter location as City, State"
        required
      />
      <TextField
        formik={formik}
        id="edit-artist-zip_code"
        name="zip_code"
        label="Zip code"
        placeholder="Enter your zip code"
        required
      />
      <MultiSelectInput
        formik={formik}
        id="edit-artist-genre"
        name="genres"
        label="Genres (up to 5)"
        placeholder="Enter location as City, State"
        listItems={genresList}
        required
      />
      <TextField
        formik={formik}
        id="edit-artist-unique_statement"
        name="unique_statement"
        label="Unique statement"
        placeholder="Enter your selling pitch, what makes you a unique live music artist"
        maxLength={150}
      />
      <TextField
        formik={formik}
        id="edit-artist-biography"
        name="biography"
        label="Brief description"
        placeholder="Enter a brief Artist / Band bio"
        multiline
        rows={3}
        maxLength={1000}
      />
      <TextField
        formik={formik}
        id="edit-artist-other_venue_plays"
        name="other_venue_plays"
        label="Other venue played"
        placeholder="Enter venues separated by a comma"
        multiline
        rows={2}
      />
      <SingleSelectInput
        formik={formik}
        id="edit-artist-profile_visibility"
        name="profile_visibility"
        label="Profile Visibility"
        listItems={profileVisibility}
        required
      />
    </>
  )
}

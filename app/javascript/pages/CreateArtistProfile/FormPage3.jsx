import React, { useState } from 'react'
import { TextField } from '../../components/UILibrary/TextField'
import { UploadImage } from '../../components/UILibrary/UploadImage'
import { UploadFile } from '../../components/UILibrary/UploadFile'

import styles from './styles.module.scss'

export const FormPage3 = ({ formik, visible }) => {
  const [photo1Preview, setPhoto1Preview] = useState()
  const [photo2Preview, setPhoto2Preview] = useState()
  const [photo3Preview, setPhoto3Preview] = useState()
  const [logoPreview, setLogoPreview] = useState()

  if (!visible) {
    return null
  }

  return (
    <>
      <h1>Media Info</h1>
      <span className={styles.headerText} style={{ marginBottom: '32px' }}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <UploadImage
        formik={formik}
        id="edit-artist-photo1"
        name="photo1"
        label="Upload photos"
        buttonLabel="Select image"
        photoPreview={photo1Preview}
        setPhotoPreview={setPhoto1Preview}
      />
      <UploadImage
        formik={formik}
        id="edit-artist-photo2"
        name="photo2"
        label=""
        buttonLabel="Select image"
        photoPreview={photo2Preview}
        setPhotoPreview={setPhoto2Preview}
      />
      <UploadImage
        formik={formik}
        id="edit-artist-photo3"
        name="photo3"
        label=""
        buttonLabel="Select image"
        photoPreview={photo3Preview}
        setPhotoPreview={setPhoto3Preview}
      />
      <UploadImage
        formik={formik}
        id="edit-artist-logo"
        name="logo"
        label="Upload logo"
        buttonLabel="Select image"
        photoPreview={logoPreview}
        setPhotoPreview={setLogoPreview}
      />
      <UploadFile
        formik={formik}
        id="edit-artist-press_sheet"
        name="press_sheet"
        label="Press sheet"
        buttonLabel="Select file"
      />
      <TextField
        formik={formik}
        id="edit-artist-website_url"
        name="website_url"
        label="Website URL"
        placeholder="Enter your band's website URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-facebook_url"
        name="facebook_url"
        label="Facebook URL"
        placeholder="Enter your band's Facebook URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-instagram_url"
        name="instagram_url"
        label="Instagram URL"
        placeholder="Enter your band's Instagram URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-spotify_url"
        name="spotify_url"
        label="Spotify URL"
        placeholder="Enter your band's Spotify URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-soundcloud_url"
        name="soundcloud_url"
        label="Soundcloud URL"
        placeholder="Enter your band's Soundcloud URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-tiktok_url"
        name="tiktok_url"
        label="Tiktok URL"
        placeholder="Enter your band's Tiktok URL"
      />
      <TextField
        formik={formik}
        id="edit-artist-youtube_url"
        name="youtube_url"
        label="Youtube URL"
        placeholder="Enter your band's Youtube URL"
      />
    </>
  )
}

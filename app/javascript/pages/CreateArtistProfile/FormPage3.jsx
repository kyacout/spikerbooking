import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import styles from './styles.module.scss'

export const FormPage3 = ({ formik }) => {
  const [photo1Preview, setPhoto1Preview] = useState()
  const [photo2Preview, setPhoto2Preview] = useState()
  const [photo3Preview, setPhoto3Preview] = useState()

  return (
    <>
      <h1>Media Info</h1>
      <span className={styles.headerText}>
        This is your chance to shine. This information will be publicly displayed on your Artist Profile Page. It can be
        edited at any time.
      </span>
      <Box display="flex" textAlign="center" justifyContent="space-between" mt="16px" mb="8px">
        <Avatar size="md" src={photo1Preview} sx={{ height: '80px', width: '80px' }} />
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px' }}
          size="large"
        >
          Photo 1
          <input
            name="photo1"
            accept="image/*"
            type="file"
            hidden
            onChange={e => {
              formik.setFieldValue('photo1', e.target.files[0])
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setPhoto1Preview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
      </Box>
      <Box display="flex" textAlign="center" justifyContent="space-between" mt="16px" mb="8px">
        <Avatar size="md" src={photo2Preview} sx={{ height: '80px', width: '80px' }} />
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px' }}
          size="large"
        >
          Photo 2
          <input
            name="photo2"
            accept="image/*"
            type="file"
            hidden
            onChange={e => {
              formik.setFieldValue('photo2', e.target.files[0])
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setPhoto2Preview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
      </Box>
      <Box display="flex" textAlign="center" justifyContent="space-between" mt="16px" mb="8px">
        <Avatar size="md" src={photo3Preview} sx={{ height: '80px', width: '80px' }} />
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px' }}
          size="large"
        >
          Photo 3
          <input
            name="photo3"
            accept="image/*"
            type="file"
            hidden
            onChange={e => {
              formik.setFieldValue('photo3', e.target.files[0])
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setPhoto3Preview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
      </Box>
      <Box display="flex" textAlign="center" mt="16px" mb="8px">
        <TextField value={formik.values.press_sheet} fullwidth style={{ overflow: 'hidden', width: '100%' }} disabled />
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px', width: '200px', minWidth: '200px' }}
          size="large"
        >
          Logo
          <input name="logo" type="file" hidden onChange={formik.handleChange} />
        </Button>
      </Box>
      <Box display="flex" textAlign="center" mt="16px" mb="8px">
        <TextField value={formik.values.press_sheet} fullwidth style={{ overflow: 'hidden', width: '100%' }} disabled />
        <Button
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 0 auto 20px', width: '200px', minWidth: '200px' }}
          size="large"
        >
          Press sheet
          <input name="press_sheet" type="file" hidden onChange={formik.handleChange} />
        </Button>
      </Box>
      <TextField
        fullWidth
        name="website_url"
        label="Website URL:"
        value={formik.values.website_url}
        onChange={formik.handleChange}
        error={formik.touched.website_url && Boolean(formik.errors.website_url)}
        helperText={formik.touched.website_url && formik.errors.website_url}
        margin="normal"
        placeholder="Enter your band's website URL"
      />
      <TextField
        fullWidth
        name="facebook_url"
        label="Facebook URL:"
        value={formik.values.facebook_url}
        onChange={formik.handleChange}
        error={formik.touched.facebook_url && Boolean(formik.errors.facebook_url)}
        helperText={formik.touched.facebook_url && formik.errors.facebook_url}
        margin="normal"
        placeholder="Enter your band's facebook URL"
      />
      <TextField
        fullWidth
        name="instagram_url"
        label="Instagram URL:"
        value={formik.values.instagram_url}
        onChange={formik.handleChange}
        error={formik.touched.instagram_url && Boolean(formik.errors.instagram_url)}
        helperText={formik.touched.instagram_url && formik.errors.instagram_url}
        margin="normal"
        placeholder="Enter your band's instagram URL"
      />
      <TextField
        fullWidth
        name="spotify_url"
        label="Spotify URL:"
        value={formik.values.spotify_url}
        onChange={formik.handleChange}
        error={formik.touched.spotify_url && Boolean(formik.errors.spotify_url)}
        helperText={formik.touched.spotify_url && formik.errors.spotify_url}
        margin="normal"
        placeholder="Enter your band's spotify URL"
      />
      <TextField
        fullWidth
        name="soundcloud_url"
        label="Soundcloud URL:"
        value={formik.values.soundcloud_url}
        onChange={formik.handleChange}
        error={formik.touched.soundcloud_url && Boolean(formik.errors.soundcloud_url)}
        helperText={formik.touched.soundcloud_url && formik.errors.soundcloud_url}
        margin="normal"
        placeholder="Enter your band's soundcloud URL"
      />
      <TextField
        fullWidth
        name="tiktok_url"
        label="Tiktok URL:"
        value={formik.values.tiktok_url}
        onChange={formik.handleChange}
        error={formik.touched.tiktok_url && Boolean(formik.errors.tiktok_url)}
        helperText={formik.touched.tiktok_url && formik.errors.tiktok_url}
        margin="normal"
        placeholder="Enter your band's tiktok URL"
      />
      <TextField
        fullWidth
        name="youtube_url"
        label="Youtube URL:"
        value={formik.values.youtube_url}
        onChange={formik.handleChange}
        error={formik.touched.youtube_url && Boolean(formik.errors.youtube_url)}
        helperText={formik.touched.youtube_url && formik.errors.youtube_url}
        margin="normal"
        placeholder="Enter your band's youtube URL"
      />
    </>
  )
}

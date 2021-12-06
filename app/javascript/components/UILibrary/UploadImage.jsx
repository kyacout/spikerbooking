import React from 'react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { InputLabel } from './InputLabel'
import Box from '@mui/material/Box'

export const UploadImage = ({
  id,
  name,
  formik,
  label,
  buttonLabel,
  required = false,
  photoPreview,
  setPhotoPreview,
}) => {
  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: theme => ({
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
        }),
        textAlign: 'center',
        justifyContent: 'space-between',
        mb: '32px',
      }}
    >
      <InputLabel htmlFor={id} label={label} mt="20px" required={required} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: theme => ({
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
            width: '100%',
          }),
        }}
      >
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 'auto 20px auto 0', flex: 1 }}
          size="large"
        >
          {buttonLabel}
          <input
            id={id}
            name={name}
            accept="image/*"
            type="file"
            hidden
            onChange={e => {
              formik.setFieldValue(name, e.target.files[0])
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setPhotoPreview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
        <Avatar size="md" src={photoPreview} sx={{ height: '80px', width: '80px', mt: '20px', alignSelf: 'center' }}>
          <InsertPhotoIcon />
        </Avatar>
      </Box>
    </FormControl>
  )
}

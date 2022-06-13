import React from 'react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { InputLabel } from './InputLabel'
import Box from '@mui/material/Box'
import { useStore } from '../../store/store'

export const UploadImage = ({
  id,
  name,
  label,
  buttonLabel,
  required,
  photoPreview,
  setPhotoPreview,
  errorMessage,
  register,
  setPhoto,
}) => {
  const { onChange, ...params } = register(name)
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
          width: '100%',
          flexDirection: 'column',
        }}
      >
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
            sx={{ m: 'auto 20px 0 0', flex: 1 }}
            size="large"
          >
            {buttonLabel}
            <input
              id={id}
              name={name}
              type="file"
              hidden
              onChange={e => {
                // console.log(e.target.files[0])
                console.log('🚀 ~ file: UploadImage.jsx ~ line 73 ~ e.target.files[0]', e.target.files[0])
                onChange(e)
                setPhoto(e.target.files[0], name)
                setPhotoPreview(URL.createObjectURL(e.target.files[0]))
              }}
              {...params}
            />
          </Button>
          <Avatar size="md" src={photoPreview} sx={{ height: '80px', width: '80px', alignSelf: 'center' }}>
            <InsertPhotoIcon />
          </Avatar>
        </Box>
        {errorMessage && (
          <Box
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
          </Box>
        )}
      </Box>
    </FormControl>
  )
}

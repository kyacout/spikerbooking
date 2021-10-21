import filter from 'lodash/filter'
import join from 'lodash/join'
import replace from 'lodash/replace'

export const baseURL = 'https://res.cloudinary.com/spikerbooking-dev/image/upload/'

const defaultOptions = {
  crop: 'pad',
  fetchFormat: 'auto',
  quality: 'auto',
}

export const imageURL = (path, options = defaultOptions) => {
  const pathWithoutLeadingSlash = replace(path, /^\/+/, '')

  const { crop, fetchFormat, height, quality, width } = {
    ...defaultOptions,
    ...options,
  }

  // The order of the parameters is important
  // Sort this alphabetically when adding a new prop
  const parameters = join(
    filter([
      fetchFormat && `f_${fetchFormat}`,
      crop && `c_${crop}`,
      quality && `q_${quality}`,
      width && `w_${width}`,
      height && `h_${height}`,
    ]),
    ',',
  )

  return new URL(`${parameters}/${pathWithoutLeadingSlash}`, baseURL).toString()
}

export const svgURL = path => new URL(path, baseURL).toString()

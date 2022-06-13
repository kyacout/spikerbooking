import { getReq } from './HTTPRequest'
import { ARTIST, VENUE } from './constants'

export const postAuthentication = userType => {
  getReq('/api/v1/user/has_profile').then(({ errors, data }) => {
    if (!errors) {
      const { profile_exists } = data
      if (profile_exists) {
        window.location.replace('/')
      } else {
        if (userType === ARTIST) {
          window.location.replace('/create-artist-profile')
        } else if (userType === VENUE) {
          window.location.replace('/create-venue-profile')
        } else {
          console.error('Unknown user type')
          window.location.replace('/')
        }
      }
    }
  })
}

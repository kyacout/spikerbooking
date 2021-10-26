import { getReq } from './HTTPRequest'

export const postAuthentication = () => {
  getReq('/api/v1/user/has_profile').then(({ errors, data }) => {
    if (!errors) {
      const { profile_exists } = data
      if (profile_exists) {
        window.location.replace('/')
      } else {
        window.location.replace('/create-venue-profile')
      }
    }
  })
}

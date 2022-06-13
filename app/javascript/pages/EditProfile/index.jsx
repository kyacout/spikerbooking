import React, { useState, useContext, useEffect } from 'react'

import { Context } from '../../components/App'
import { getReq } from '../../helpers/HTTPRequest'
import { CreateArtistProfile } from '../CreateArtistProfile'
import { CreateVenueProfile } from '../CreateVenueProfile'
import { Loading } from '../../components/Loading'
import { ARTIST, VENUE } from '../../helpers/constants'
import { useStore } from '../../store/store'

export const EditProfile = () => {
  const { currentUser, artistProfileId, venueProfileId } = useContext(Context)

  const { artist, addArtistInfo, venue, addVenueInfo } = useStore()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (currentUser.current_type === ARTIST && artistProfileId) {
      getReq(`/api/v1/artist_profiles/${artistProfileId}`).then(({ errors, data }) => {
        if (!errors) {
          addArtistInfo(data)
        }
      })
    } else if (currentUser.current_type === VENUE && venueProfileId) {
      getReq(`/api/v1/venue_profiles/${venueProfileId}`).then(({ errors, data }) => {
        if (!errors) {
          addVenueInfo(data)
        }
      })
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <Loading loading />
  }

  return <>{currentUser.current_type === ARTIST ? <CreateArtistProfile /> : <CreateVenueProfile />}</>
}

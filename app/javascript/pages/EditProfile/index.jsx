import React, { useState, useContext, useEffect } from 'react'

import { Context } from '../../components/App'
import { getReq } from '../../helpers/HTTPRequest'
import { CreateArtistProfile } from '../CreateArtistProfile'
import { CreateVenueProfile } from '../CreateVenueProfile'
import { Loading } from '../../components/Loading'
import { ARTIST, VENUE } from '../../helpers/constants'

export const EditProfile = () => {
  const { currentUser, artistProfileId, venueProfileId } = useContext(Context)
  const [artistInfo, setArtistInfo] = useState()
  const [venueInfo, setVenueInfo] = useState()

  const isLoading =
    (currentUser.current_type === ARTIST && artistProfileId && !artistInfo) ||
    (currentUser.current_type === VENUE && venueProfileId && !venueInfo)

  useEffect(() => {
    if (currentUser.current_type === ARTIST && artistProfileId) {
      getReq(`/api/v1/artist_profiles/${artistProfileId}`).then(({ errors, data }) => {
        if (!errors) {
          setArtistInfo(data)
        }
      })
    } else if (currentUser.current_type === VENUE && venueProfileId) {
      getReq(`/api/v1/venue_profiles/${venueProfileId}`).then(({ errors, data }) => {
        if (!errors) {
          setVenueInfo(data)
        }
      })
    }
  }, [])

  if (isLoading) {
    return <Loading loading />
  }

  return (
    <>
      {currentUser.current_type === ARTIST ? (
        <CreateArtistProfile {...artistInfo} />
      ) : (
        <CreateVenueProfile {...venueInfo} />
      )}
    </>
  )
}

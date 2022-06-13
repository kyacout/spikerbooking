import React, { useContext, useEffect } from 'react'
import { Context } from '../../components/App'
import { useHistory } from 'react-router-dom'
import { Loading } from '../../components/Loading'

export const ViewProfile = () => {
  const { artistProfileId, venueProfileId } = useContext(Context)
  const history = useHistory()

  const getProfile = () => {
    if (artistProfileId) {
      history.push(`/artists/${artistProfileId}`)
    } else if (venueProfileId) {
      history.push(`/venues/${venueProfileId}`)
    } else {
      window.location = '/edit-profile'
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return <Loading message="Getting your Data..." loading={true} />
}

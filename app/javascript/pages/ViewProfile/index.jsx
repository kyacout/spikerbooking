import React, { useContext, useEffect } from 'react'
import { Context } from '../../components/App'
import { useHistory } from 'react-router-dom'

export const ViewProfile = () => {
  const { artistProfileId, venueProfileId } = useContext(Context)
  const history = useHistory()

  const getProfile = () => {
    if (artistProfileId) {
      history.push(`/artists/${artistProfileId}`)
    } else {
      history.push(`/venues/${venueProfileId}`)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return <div></div>
}

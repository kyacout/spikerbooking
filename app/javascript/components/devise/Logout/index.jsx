import React, { useContext, useEffect } from 'react'
import { deleteReq } from '../../../helpers/HTTPRequest'
import { Context } from '../../App'
import { Loading } from '../../Loading'

export const Logout = () => {
  const { token } = useContext(Context)

  const handleLogout = () => {
    deleteReq('users/sign_out/', token)
      .then(() => window.location.replace('/'))
      .catch(e => console.error(e))
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return <Loading message="Logging Out..." loading={true} />
}

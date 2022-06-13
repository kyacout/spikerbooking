import React, { useEffect } from 'react'

export const LoginRedirect = () => {
  useEffect(() => {
    window.location.replace('/users/sign_in')
  }, [])

  return <div />
}

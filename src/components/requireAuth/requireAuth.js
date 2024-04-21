import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  /*function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()
  console.log(cookie.token)*/
  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" />
  }

  return children
}

export default RequireAuth

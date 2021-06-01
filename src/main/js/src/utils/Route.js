import React from 'react'
import { Redirect, Route, useHistory } from 'react-router'
import { useAuth } from './Auth'

export function AdminRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()
  if (loading) return <span>Loading...</span>
  if (!user) return <Redirect to='/login'></Redirect>
  if (user.uloga == 'ADMIN')
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    )

  return <Redirect to='/'></Redirect>
}

export function TrenerRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()
  if (loading) return <span>Loading...</span>
  if (!user) return <Redirect to='/login'></Redirect>
  if (user.uloga == 'TRENER')
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    )

  return <Redirect to='/'></Redirect>
}

export function ClanRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()
  if (loading) return <span>Loading...</span>
  if (!user) return <Redirect to='/login'></Redirect>
  if (user.uloga == 'CLAN')
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    )

  return <Redirect to='/'></Redirect>
}

export function GuestOnlyRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()
  const history = useHistory()
  if (loading) return <span>Loading...</span>
  if (!user)
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    )
  history.goBack()
}

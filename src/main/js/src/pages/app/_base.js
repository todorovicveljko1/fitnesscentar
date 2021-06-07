import React, { useState, Suspense } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { useAuth } from '../../utils/Auth'
import Dashboard from '../../components/Layout/Dashboard'
import loadable from '@loadable/component'

const FitnessCentri = loadable(() => import('./fitnesscentri/index'))

function Register() {
  const history = useHistory()
  const { user } = useAuth()
  let { path } = useRouteMatch()

  return (
    <Dashboard>
      <Suspense fallback={<div>loading ...</div>}>
        <Switch>
          <Route
            path={`${path}/fitnesscentri`}
            exact
            component={FitnessCentri}
          />
        </Switch>
      </Suspense>
    </Dashboard>
  )
}

export default Register
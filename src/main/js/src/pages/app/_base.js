import React, { useState, Suspense } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { useAuth } from '../../utils/Auth'
import { ProtectedRoute, AdminRoute } from '../../utils/Route'
import Dashboard from '../../components/Layout/Dashboard'
import loadable from '@loadable/component'

const FitnessCentri = loadable(() => import('./fitnesscentri/index'))
const OneFitnessCentri = loadable(() => import('./fitnesscentri/[id]'))
const TreneriPotvrdi = loadable(() => import('./treneri/potvrdi'))
const Treninzi = loadable(() => import('./treninzi/index'))

function Register() {
  const history = useHistory()
  const { user } = useAuth()
  let { path } = useRouteMatch()

  return (
    <Dashboard>
      <Suspense fallback={<div>loading ...</div>}>
        <Switch>
          <AdminRoute
            path={`${path}/fitnesscentri`}
            exact
            component={FitnessCentri}
          />
          <AdminRoute
            path={`${path}/fitnesscentri/:id`}
            exact
            component={OneFitnessCentri}
          />
          <ProtectedRoute
            path={`${path}/treninzi`}
            exact
            component={Treninzi}
          />
          <AdminRoute
            path={`${path}/treneri/potvrdi`}
            exact
            component={TreneriPotvrdi}
          />
        </Switch>
      </Suspense>
    </Dashboard>
  )
}

export default Register

import React, { useState, Suspense } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { useAuth } from '../../utils/Auth'
import {
  ProtectedRoute,
  AdminRoute,
  ClanRoute,
  TrenerRoute,
} from '../../utils/Route'
import Dashboard from '../../components/Layout/Dashboard'
import loadable from '@loadable/component'
import PickFCModal from '../../components/Modal/PickFC'

const FitnessCentri = loadable(() => import('./fitnesscentri/index'))
const OneFitnessCentri = loadable(() => import('./fitnesscentri/[id]'))
const TreneriPotvrdi = loadable(() => import('./treneri/potvrdi'))
const TreninziPretraga = loadable(() => import('./treninzi/pretraga'))
const Treninzi = loadable(() => import('./treninzi/index'))
const OneTreninzi = loadable(() => import('./treninzi/[id]'))
const Treneri = loadable(() => import('./treneri/index'))
const OneTermini = loadable(() => import('./termini/[id]'))
const PrijaveTermini = loadable(() => import('./termini/prijave'))
const Odradjeni = loadable(() => import('./odradjeni'))

function Register() {
  const history = useHistory()
  const { user, hasRole, loading } = useAuth()
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
          <AdminRoute path={`${path}/treneri`} exact component={Treneri} />
          <AdminRoute
            path={`${path}/fitnesscentri/:id`}
            exact
            component={OneFitnessCentri}
          />
          <ProtectedRoute
            path={`${path}/treninzi/pretraga`}
            exact
            component={TreninziPretraga}
          />
          <TrenerRoute path={`${path}/treninzi`} exact component={Treninzi} />
          <TrenerRoute
            path={`${path}/treninzi/:id`}
            exact
            component={OneTreninzi}
          />
          <ClanRoute
            path={`${path}/termini/prijave`}
            exact
            component={PrijaveTermini}
          />
          <ClanRoute
            path={`${path}/termini/:id`}
            exact
            component={OneTermini}
          />

          <ClanRoute
            path={`${path}/odradjeni/:koji`}
            exact
            component={Odradjeni}
          />
          <AdminRoute
            path={`${path}/treneri/potvrdi`}
            exact
            component={TreneriPotvrdi}
          />
        </Switch>
      </Suspense>

      {!loading && user && hasRole('TRENER') && (
        <div>
          <PickFCModal user={user} />
        </div>
      )}
    </Dashboard>
  )
}

export default Register

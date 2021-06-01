import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import loadable from '@loadable/component'
import Main from '../components/Layout/Main'
import { AuthProvider } from '../utils/Auth'
import { AdminRoute, GuestOnlyRoute } from '../utils/Route'

const Login = loadable(() => import('./login'))
const Register = loadable(() => import('./register'))
const Dev = loadable(() => import('./dev'))

const queryClient = new QueryClient()

function App(props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>loading ...</div>}>
            <Switch>
              <Route
                path='/'
                exact
                render={() => <Main background={false}>FitnessCentar</Main>}
              />
              <AdminRoute path='/dev' exact component={Dev} />
              <GuestOnlyRoute path='/login' exact component={Login} />
              <GuestOnlyRoute path='/register' exact component={Register} />
            </Switch>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

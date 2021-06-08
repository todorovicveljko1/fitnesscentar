import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useIsFetching } from 'react-query'

import loadable from '@loadable/component'
import Main from '../components/Layout/Main'
import { AuthProvider } from '../utils/Auth'
import { AdminRoute, GuestOnlyRoute, ProtectedRoute } from '../utils/Route'

/*function AppLoadBar(props) {
  const isFetching = useIsFetching()
  return (
    <div className='apploadbar'>
      <div
        className={`apploadbar_line ${!!isFetching && 'loadanimation'}`}
      ></div>
    </div>
  )
}*/

const Login = loadable(() => import('./login'))
const Register = loadable(() => import('./register'))
const Dev = loadable(() => import('./dev'))
const Home = loadable(() => import('./index'))
const AppBase = loadable(() => import('./app/_base'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App(props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>loading ...</div>}>
            <Switch>
              <Route path='/' exact component={Home} />
              <ProtectedRoute path='/app' component={AppBase} />
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

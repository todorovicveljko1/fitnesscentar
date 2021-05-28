import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import loadable from '@loadable/component'
import Main from '../components/Layout/Main'

const Login = loadable(() => import('./login'))
const Register = loadable(() => import('./register'))

function App(props) {
  return (
    <Router>
      <Suspense fallback={<div>loading ...</div>}>
        <Switch>
          <Route
            path='/'
            exact
            render={() => <Main background={false}>FitnessCentar</Main>}
          />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App

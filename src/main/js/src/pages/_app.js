import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App(props) {
  return (
    <Router>
      <Suspense fallback={<div>loading ...</div>}>
        <Switch>
          <Route path='/' exact render={() => <div>FitnessCentar</div>} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
